# Using Diametral in Streamlit

Streamlit is Python and renders its own React widgets, so you don't `npm install`
the package into it. There are three practical layers — use as many as you need:

1. **Theme config** — align Streamlit's built-in colors with the brand (1 min).
2. **CSS injection** — load the Diametral stylesheet + flatten native widgets.
3. **`.ds-*` HTML blocks** — render on-brand custom markup with `st.markdown`.

## 1. Theme config (colors + base look)

Map Streamlit's theme to the brand in `.streamlit/config.toml`:

```toml
[theme]
primaryColor = "#ff2a00"            # Diametral accent (rouge)
backgroundColor = "#ffffff"
secondaryBackgroundColor = "#f5f5f5" # whitesmoke
textColor = "#161616"                # noir
font = "sans serif"                  # Geist needs CSS injection (below)
```

This colors buttons, links, sliders and the sidebar without any CSS. It can't
load Geist/Ufficio or remove border-radius — that's step 2.

## 2. Inject the stylesheet + flatten widgets

Streamlit's markdown sanitizer can strip a bare `<link>`, and `css/diametral.css`
is `@import`-based (relative URLs that 404 once inlined). The reliable path —
verified in the [`examples/streamlit/`](../examples/streamlit/) Docker app — is to
**fetch the flattened `dist/diametral.css` bundle and inline it** in a `<style>`
(which Streamlit keeps), plus a few overrides that flatten Streamlit's own widgets:

```python
import urllib.request
import streamlit as st

CDN = "https://unpkg.com/@diametral/design-system/dist/diametral.css"  # flattened bundle (not css/)

@st.cache_data(show_spinner=False)
def _diametral_css() -> str:
    return urllib.request.urlopen(CDN, timeout=15).read().decode("utf-8")

def inject_diametral():
    st.markdown(
        f"""<style>
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap');
{_diametral_css()}
/* Flatten Streamlit's own widgets to the Diametral look */
html, body, button, input, textarea, [class*="st-"] {{ font-family: "Geist", -apple-system, sans-serif; }}
.stButton > button, .stDownloadButton > button, .stFormSubmitButton > button {{
  border-radius: 0; border: 1px solid #161616; background: #161616; color: #fff; box-shadow: none; font-weight: 500;
}}
.stButton > button:hover {{ background: #000; }}
.stTextInput input, .stNumberInput input, .stTextArea textarea,
[data-baseweb="select"] > div, [data-baseweb="input"] {{ border-radius: 0 !important; box-shadow: none !important; }}
[data-testid="stMetric"] {{ border: 1px solid #e5e5e5; padding: 14px 16px; }}
a {{ color: #db2400; }}
</style>""",
        unsafe_allow_html=True,
    )

inject_diametral()
```

> Why fetch-and-inline rather than a `<link>`: Streamlit can drop a bare `<link>`,
> and inlining `css/diametral.css` breaks its relative `@import`s — the `dist`
> bundle has every rule inlined, so it works. Native widgets are Streamlit's own
> React DOM, so the selectors target stable `data-testid` / `data-baseweb` hooks —
> pin Streamlit and re-check after upgrades. A runnable version of this exact page
> (with a Dockerfile) lives in [`examples/streamlit/`](../examples/streamlit/).

## 3. Render `.ds-*` blocks with `st.markdown`

For anything that isn't a native widget — headers, cards, stat bands, the visible
grid system, tags, badges, tables — write the `.ds-*` markup straight into
`st.markdown(..., unsafe_allow_html=True)`. These are pure CSS, so they render
exactly as in the showcase:

```python
# A page header
st.markdown('<h1 class="ds-title ds-title--xl">Pricing matrix</h1>', unsafe_allow_html=True)

# The signature stat band (visible grid system)
st.markdown("""
<div class="ds-statgrid">
  <div class="ds-statgrid__cell"><div class="ds-statgrid__label">Revenue</div><div class="ds-statgrid__value">€4.5M</div></div>
  <div class="ds-statgrid__cell"><div class="ds-statgrid__label">Margin</div><div class="ds-statgrid__value">24.6%</div></div>
  <div class="ds-statgrid__cell"><div class="ds-statgrid__label">Projects</div><div class="ds-statgrid__value">86</div></div>
</div>
""", unsafe_allow_html=True)

# A card + a tag
st.markdown('<div class="ds-card" style="padding:18px 20px">On track <span class="ds-tag ds-tag--success">Run</span></div>', unsafe_allow_html=True)
```

Browse [the showcase](https://littlebigcode.github.io/design-system/) for the full
class list — any static `.ds-*` component (cards, badges, tags, callouts, tables,
the grid system, the stat band) works this way.

## Going further

- **Charts:** keep using `st.plotly_chart` / `st.altair_chart` and pass the brand
  palette (`#ff2a00`, `#1488a6`, `#2e7d4f`, `#9f8667`, `#7b5ea7`, `#e0a32e`).
- **The interactive React components** (DataGrid, Kanban, ConsoleLayout) need a
  DOM Streamlit doesn't expose. To embed one, build a
  [Streamlit Custom Component](https://docs.streamlit.io/develop/concepts/custom-components)
  (a small React bundle that imports `@diametral/design-system/react`).
- **Emails:** the [email kit](emails.md) is a Node module. From a Python backend,
  render it via a tiny Node sidecar, or copy a template's HTML output and fill the
  placeholders server-side.
