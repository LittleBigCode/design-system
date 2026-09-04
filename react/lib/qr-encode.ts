// Hand-rolled QR encoder (ISO/IEC 18004), byte-mode only.
//
// Deliberate scope trim, documented per the component-expansion plan: this
// supports versions 1-10 only, not the full 1-40 range, and byte mode only —
// no numeric/alphanumeric/kanji mode optimization. Byte mode encodes any UTF-8
// string correctly; the other modes exist purely to pack specific character
// sets more densely into the same version, which is a size optimization, not a
// correctness requirement. Past the ceiling `encodeQr` throws rather than
// truncating. Measured capacity: L 271, M 213, Q 151, H 119 bytes.
//
// Verified by sweeping every byte length 1-250 at all four correction levels
// (exercising versions 1-10) through an independent decoder, jsQR: every
// matrix round-tripped back to its exact input, multibyte UTF-8 and emoji
// surrogate pairs included.
//
// Port the logic, not a translation of any one existing library — this
// follows the standard ISO/IEC 18004 algorithm shape (Reed-Solomon over
// GF(256), the standard data-placement zigzag, the eight mask patterns scored
// by the four penalty rules) that every conformant encoder implements.

export type QrErrorCorrectionLevel = "L" | "M" | "Q" | "H"

export interface QrMatrix {
  /** Module count per side, including function patterns but not the quiet zone. */
  size: number
  /** The QR version (1-10) auto-selected to fit `text` at the given level. */
  version: number
  /** `modules[row][col]`, `true` = dark. */
  modules: boolean[][]
}

// ---- GF(256) arithmetic (field used by Reed-Solomon below) ----
const GF_EXP = new Array<number>(512)
const GF_LOG = new Array<number>(256)
;(function initGaloisField() {
  let x = 1
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x
    GF_LOG[x] = i
    x <<= 1
    if (x & 0x100) x ^= 0x11d
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255]
})()

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0
  return GF_EXP[GF_LOG[a] + GF_LOG[b]]
}

function generatorPolynomial(degree: number): number[] {
  const coeffs = [1]
  for (let i = 0; i < degree; i++) {
    coeffs.push(0)
    for (let j = coeffs.length - 1; j > 0; j--) {
      coeffs[j] ^= gfMul(coeffs[j - 1], GF_EXP[i])
    }
  }
  return coeffs
}

function rsEncode(dataBytes: number[], ecLen: number): number[] {
  const gen = generatorPolynomial(ecLen)
  const res = new Array<number>(ecLen).fill(0)
  for (const b of dataBytes) {
    const factor = b ^ res[0]
    res.shift()
    res.push(0)
    if (factor !== 0) {
      for (let i = 0; i < ecLen; i++) res[i] ^= gfMul(gen[i + 1], factor)
    }
  }
  return res
}

// [totalCodewords, ecCodewordsPerBlock, group1Blocks, group1Cw, group2Blocks, group2Cw]
type VersionRow = readonly [number, number, number, number, number, number]

const VERSION_INFO: Record<
  QrErrorCorrectionLevel,
  Record<number, VersionRow>
> = {
  L: {
    1: [19, 7, 1, 19, 0, 0],
    2: [34, 10, 1, 34, 0, 0],
    3: [55, 15, 1, 55, 0, 0],
    4: [80, 20, 1, 80, 0, 0],
    5: [108, 26, 1, 108, 0, 0],
    6: [136, 18, 2, 68, 0, 0],
    7: [156, 20, 2, 78, 0, 0],
    8: [194, 24, 2, 97, 0, 0],
    9: [232, 30, 2, 116, 0, 0],
    10: [274, 18, 2, 68, 2, 69],
  },
  M: {
    1: [16, 10, 1, 16, 0, 0],
    2: [28, 16, 1, 28, 0, 0],
    3: [44, 26, 1, 44, 0, 0],
    4: [64, 18, 2, 32, 0, 0],
    5: [86, 24, 2, 43, 0, 0],
    6: [108, 16, 4, 27, 0, 0],
    7: [124, 18, 4, 31, 0, 0],
    8: [154, 22, 2, 38, 2, 39],
    9: [182, 22, 3, 36, 2, 37],
    10: [216, 26, 4, 43, 1, 44],
  },
  Q: {
    1: [13, 13, 1, 13, 0, 0],
    2: [22, 22, 1, 22, 0, 0],
    3: [34, 18, 2, 17, 0, 0],
    4: [48, 26, 2, 24, 0, 0],
    5: [62, 18, 2, 15, 2, 16],
    6: [76, 24, 4, 19, 0, 0],
    7: [88, 18, 2, 14, 4, 15],
    8: [110, 22, 4, 18, 2, 19],
    9: [132, 20, 4, 16, 4, 17],
    10: [154, 24, 6, 19, 2, 20],
  },
  H: {
    1: [9, 17, 1, 9, 0, 0],
    2: [16, 28, 1, 16, 0, 0],
    3: [26, 22, 2, 13, 0, 0],
    4: [36, 16, 4, 9, 0, 0],
    5: [46, 22, 2, 11, 2, 12],
    6: [60, 28, 4, 15, 0, 0],
    7: [66, 26, 4, 13, 1, 14],
    8: [86, 26, 4, 14, 2, 15],
    9: [100, 24, 4, 12, 4, 13],
    10: [122, 28, 6, 15, 2, 16],
  },
}

const ALIGNMENT_COORDS: Record<number, number[]> = {
  1: [],
  2: [6, 18],
  3: [6, 22],
  4: [6, 26],
  5: [6, 30],
  6: [6, 34],
  7: [6, 22, 38],
  8: [6, 24, 42],
  9: [6, 26, 46],
  10: [6, 28, 50],
}

const EC_LEVEL_BITS: Record<QrErrorCorrectionLevel, number> = {
  L: 0b01,
  M: 0b00,
  Q: 0b11,
  H: 0b10,
}

function charCountBits(version: number): number {
  return version <= 9 ? 8 : 16
}

class BitBuffer {
  bits: number[] = []
  push(value: number, len: number) {
    for (let i = len - 1; i >= 0; i--) this.bits.push((value >>> i) & 1)
  }
  get length() {
    return this.bits.length
  }
  toBytes(): number[] {
    const bytes: number[] = []
    for (let i = 0; i < this.bits.length; i += 8) {
      let b = 0
      for (let j = 0; j < 8; j++) b = (b << 1) | (this.bits[i + j] || 0)
      bytes.push(b)
    }
    return bytes
  }
}

function utf8Bytes(str: string): number[] {
  return Array.from(new TextEncoder().encode(str))
}

/** Smallest version (1-10) whose data capacity fits `byteLen` bytes at `level`. */
function pickVersion(
  byteLen: number,
  level: QrErrorCorrectionLevel
): number | null {
  for (let v = 1; v <= 10; v++) {
    const [, , g1n, g1cw, g2n, g2cw] = VERSION_INFO[level][v]
    const dataCodewords = g1n * g1cw + g2n * g2cw
    const neededBits = 4 + charCountBits(v) + byteLen * 8
    if (neededBits <= dataCodewords * 8) return v
  }
  return null
}

function buildDataCodewords(
  text: string,
  version: number,
  level: QrErrorCorrectionLevel
): number[] {
  const [, , g1n, g1cw, g2n, g2cw] = VERSION_INFO[level][version]
  const capacityBits = (g1n * g1cw + g2n * g2cw) * 8

  const data = utf8Bytes(text)
  const bb = new BitBuffer()
  bb.push(0b0100, 4) // byte-mode indicator
  bb.push(data.length, charCountBits(version))
  for (const byte of data) bb.push(byte, 8)

  const termLen = Math.min(4, capacityBits - bb.length)
  if (termLen > 0) bb.push(0, termLen)
  while (bb.length % 8 !== 0) bb.push(0, 1)

  const padBytes = [0xec, 0x11]
  let pi = 0
  while (bb.length < capacityBits) {
    bb.push(padBytes[pi % 2], 8)
    pi++
  }
  return bb.toBytes()
}

function splitBlocks(
  dataCodewords: number[],
  version: number,
  level: QrErrorCorrectionLevel
) {
  const [, ecPerBlock, g1n, g1cw, g2n, g2cw] = VERSION_INFO[level][version]
  const blocks: number[][] = []
  let offset = 0
  for (let i = 0; i < g1n; i++) {
    blocks.push(dataCodewords.slice(offset, offset + g1cw))
    offset += g1cw
  }
  for (let i = 0; i < g2n; i++) {
    blocks.push(dataCodewords.slice(offset, offset + g2cw))
    offset += g2cw
  }
  const ecBlocks = blocks.map((blk) => rsEncode(blk, ecPerBlock))
  return { blocks, ecBlocks }
}

function interleave(blocks: number[][], ecBlocks: number[][]): number[] {
  const out: number[] = []
  const maxLen = Math.max(...blocks.map((b) => b.length))
  for (let i = 0; i < maxLen; i++) {
    for (const blk of blocks) if (i < blk.length) out.push(blk[i])
  }
  const ecLen = ecBlocks[0].length
  for (let i = 0; i < ecLen; i++) {
    for (const blk of ecBlocks) out.push(blk[i])
  }
  return out
}

function bytesToBits(bytes: number[]): number[] {
  const bits: number[] = []
  for (const b of bytes) for (let i = 7; i >= 0; i--) bits.push((b >>> i) & 1)
  return bits
}

function moduleCount(version: number): number {
  return 17 + 4 * version
}

interface MatrixInfo {
  n: number
  modules: number[][]
  isFunction: boolean[][]
}

function makeMatrix(version: number): MatrixInfo {
  const n = moduleCount(version)
  const modules = Array.from({ length: n }, () => new Array<number>(n).fill(0))
  const isFunction = Array.from({ length: n }, () =>
    new Array<boolean>(n).fill(false)
  )

  function set(r: number, c: number, val: boolean) {
    modules[r][c] = val ? 1 : 0
    isFunction[r][c] = true
  }

  function drawFinder(r0: number, c0: number) {
    for (let dr = -1; dr <= 7; dr++) {
      for (let dc = -1; dc <= 7; dc++) {
        const rr = r0 + dr
        const cc = c0 + dc
        if (rr < 0 || rr >= n || cc < 0 || cc >= n) continue
        const isBorder = dr === -1 || dr === 7 || dc === -1 || dc === 7
        const inRing =
          dr >= 0 &&
          dr <= 6 &&
          dc >= 0 &&
          dc <= 6 &&
          (dr === 0 || dr === 6 || dc === 0 || dc === 6)
        const inCore = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4
        set(rr, cc, !isBorder && (inRing || inCore))
      }
    }
  }

  drawFinder(0, 0)
  drawFinder(0, n - 7)
  drawFinder(n - 7, 0)

  for (let i = 8; i < n - 8; i++) {
    if (!isFunction[6][i]) set(6, i, i % 2 === 0)
    if (!isFunction[i][6]) set(i, 6, i % 2 === 0)
  }

  const coords = ALIGNMENT_COORDS[version]
  for (const r of coords) {
    for (const c of coords) {
      const overlapsFinder =
        (r <= 7 && c <= 7) || (r <= 7 && c >= n - 8) || (r >= n - 8 && c <= 7)
      if (overlapsFinder) continue
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const dist = Math.max(Math.abs(dr), Math.abs(dc))
          set(r + dr, c + dc, dist !== 1)
        }
      }
    }
  }

  set(n - 8, 8, true) // dark module

  for (let i = 0; i < 9; i++) {
    if (!isFunction[8][i]) set(8, i, false)
    if (!isFunction[i][8]) set(i, 8, false)
  }
  for (let i = 0; i < 8; i++) {
    if (!isFunction[8][n - 1 - i]) set(8, n - 1 - i, false)
    if (!isFunction[n - 1 - i][8]) set(n - 1 - i, 8, false)
  }

  if (version >= 7) {
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 3; c++) {
        set(r, n - 11 + c, false) // top-right version-info block
        set(n - 11 + c, r, false) // bottom-left version-info block
      }
    }
  }

  return { n, modules, isFunction }
}

function placeData(matrixInfo: MatrixInfo, dataBits: number[]) {
  const { n, modules, isFunction } = matrixInfo
  let bitIndex = 0
  let dir = -1
  let col = n - 1
  while (col > 0) {
    if (col === 6) col--
    for (let i = 0; i < n; i++) {
      const row = dir === -1 ? n - 1 - i : i
      for (const c of [col, col - 1]) {
        if (!isFunction[row][c]) {
          modules[row][c] = bitIndex < dataBits.length ? dataBits[bitIndex] : 0
          bitIndex++
        }
      }
    }
    dir = -dir
    col -= 2
  }
}

function maskInvert(maskId: number, r: number, c: number): boolean {
  switch (maskId) {
    case 0:
      return (r + c) % 2 === 0
    case 1:
      return r % 2 === 0
    case 2:
      return c % 3 === 0
    case 3:
      return (r + c) % 3 === 0
    case 4:
      return (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0
    case 5:
      return ((r * c) % 2) + ((r * c) % 3) === 0
    case 6:
      return (((r * c) % 2) + ((r * c) % 3)) % 2 === 0
    case 7:
      return (((r + c) % 2) + ((r * c) % 3)) % 2 === 0
    default:
      return false
  }
}

function applyMask(matrixInfo: MatrixInfo, maskId: number): number[][] {
  const { n, modules, isFunction } = matrixInfo
  const out = modules.map((row) => row.slice())
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (isFunction[r][c]) continue
      if (maskInvert(maskId, r, c)) out[r][c] ^= 1
    }
  }
  return out
}

// The four standard ISO/IEC 18004 masking penalty rules — lower is better.
function penaltyScore(modules: number[][], n: number): number {
  let score = 0

  for (let r = 0; r < n; r++) {
    let runColor = modules[r][0]
    let runLen = 1
    for (let c = 1; c < n; c++) {
      if (modules[r][c] === runColor) {
        runLen++
      } else {
        if (runLen >= 5) score += 3 + (runLen - 5)
        runColor = modules[r][c]
        runLen = 1
      }
    }
    if (runLen >= 5) score += 3 + (runLen - 5)
  }
  for (let c = 0; c < n; c++) {
    let runColor = modules[0][c]
    let runLen = 1
    for (let r = 1; r < n; r++) {
      if (modules[r][c] === runColor) {
        runLen++
      } else {
        if (runLen >= 5) score += 3 + (runLen - 5)
        runColor = modules[r][c]
        runLen = 1
      }
    }
    if (runLen >= 5) score += 3 + (runLen - 5)
  }

  for (let r = 0; r < n - 1; r++) {
    for (let c = 0; c < n - 1; c++) {
      const v = modules[r][c]
      if (
        v === modules[r][c + 1] &&
        v === modules[r + 1][c] &&
        v === modules[r + 1][c + 1]
      ) {
        score += 3
      }
    }
  }

  const pattern = [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1]
  const patternRev = pattern.slice().reverse()
  const matches = (arr: number[], pat: number[]) =>
    pat.every((v, i) => arr[i] === v)

  for (let r = 0; r < n; r++) {
    for (let c = 0; c <= n - 11; c++) {
      const row = modules[r].slice(c, c + 11)
      if (matches(row, pattern) || matches(row, patternRev)) score += 40
    }
  }
  for (let c = 0; c < n; c++) {
    for (let r = 0; r <= n - 11; r++) {
      const col: number[] = []
      for (let i = 0; i < 11; i++) col.push(modules[r + i][c])
      if (matches(col, pattern) || matches(col, patternRev)) score += 40
    }
  }

  let dark = 0
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) if (modules[r][c]) dark++
  const percent = (dark * 100) / (n * n)
  const prev5 = Math.floor(percent / 5) * 5
  const next5 = prev5 + 5
  score += (Math.min(Math.abs(prev5 - 50), Math.abs(next5 - 50)) / 5) * 10

  return score
}

// Format info: BCH(15,5), generator 0x537, xor-masked with 0x5412.
function drawFormatInfo(
  matrixInfo: MatrixInfo,
  level: QrErrorCorrectionLevel,
  maskId: number
) {
  const { n, modules } = matrixInfo
  const data = (EC_LEVEL_BITS[level] << 3) | maskId
  let rem = data
  for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537)
  const bits = ((data << 10) | (rem & 0x3ff)) ^ 0x5412
  const bit = (i: number) => (bits >>> i) & 1

  for (let i = 0; i <= 5; i++) modules[i][8] = bit(i)
  modules[7][8] = bit(6)
  modules[8][8] = bit(7)
  modules[8][7] = bit(8)
  for (let i = 9; i < 15; i++) modules[8][14 - i] = bit(i)

  for (let i = 0; i < 8; i++) modules[8][n - 1 - i] = bit(i)
  for (let i = 8; i < 15; i++) modules[n - 15 + i][8] = bit(i)

  modules[n - 8][8] = 1
}

// Version info (version >= 7 only): BCH(18,6), generator 0x1F25.
function drawVersionInfo(matrixInfo: MatrixInfo, version: number) {
  if (version < 7) return
  const { n, modules } = matrixInfo
  let rem = version
  for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25)
  const bits = (version << 12) | rem
  const bit = (i: number) => (bits >>> i) & 1
  for (let i = 0; i < 18; i++) {
    const b = bit(i)
    const a = n - 11 + (i % 3)
    const rowIdx = Math.floor(i / 3)
    modules[rowIdx][a] = b
    modules[a][rowIdx] = b
  }
}

/**
 * Encodes `text` (any UTF-8 string) as a QR symbol. Auto-selects the smallest
 * of versions 1-10 that fits at the given error-correction level, and throws
 * if even version 10 is too small — see the module comment for why the range
 * stops there.
 */
export function encodeQr(
  text: string,
  level: QrErrorCorrectionLevel = "M"
): QrMatrix {
  const dataLen = utf8Bytes(text).length
  const version = pickVersion(dataLen, level)
  if (version === null) {
    throw new Error(
      `encodeQr: text too long for the supported range (versions 1-10, level ${level})`
    )
  }

  const dataCodewords = buildDataCodewords(text, version, level)
  const { blocks, ecBlocks } = splitBlocks(dataCodewords, version, level)
  const dataBits = bytesToBits(interleave(blocks, ecBlocks))

  const matrixInfo = makeMatrix(version)
  placeData(matrixInfo, dataBits)

  let bestMask = 0
  let bestScore = Infinity
  for (let m = 0; m < 8; m++) {
    drawFormatInfo(matrixInfo, level, m)
    drawVersionInfo(matrixInfo, version)
    const score = penaltyScore(applyMask(matrixInfo, m), matrixInfo.n)
    if (score < bestScore) {
      bestScore = score
      bestMask = m
    }
  }
  drawFormatInfo(matrixInfo, level, bestMask)
  drawVersionInfo(matrixInfo, version)
  const finalModules = applyMask(matrixInfo, bestMask)

  return {
    size: matrixInfo.n,
    version,
    modules: finalModules.map((row) => row.map((v) => v === 1)),
  }
}
