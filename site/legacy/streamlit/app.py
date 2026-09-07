"""Diametral × Streamlit — using the design system from Python.

Two layers:
  1. Inject the published stylesheet. Streamlit's markdown sanitizer can strip a
     bare <link>, so the robust path is to FETCH diametral.css and inline it in a
     <style> (which Streamlit allows) — plus a few overrides that flatten
     Streamlit's own widgets to the flat/1px/no-radius brand.
  2. Render `.ds-*` blocks with st.markdown(..., unsafe_allow_html=True).
Native-widget colors also come from .streamlit/config.toml. See docs/streamlit.md.
"""
import urllib.request
import streamlit as st

# Use the FLATTENED bundle: css/diametral.css is @import-based (relative URLs that
# 404 when inlined), whereas dist/diametral.css has every rule inlined.
CDN = "https://unpkg.com/@diametral/design-system@0.8.0/dist/diametral.css"


@st.cache_data(show_spinner=False)
def diametral_css() -> str:
    try:
        return urllib.request.urlopen(CDN, timeout=15).read().decode("utf-8")
    except Exception as exc:  # graceful: page still renders, just unstyled
        return f"/* could not fetch {CDN}: {exc} */"


def inject_diametral() -> None:
    st.markdown(
        f"""<style>
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap');
{diametral_css()}
/* Flatten Streamlit's native widgets to the Diametral look */
html, body, button, input, textarea, [class*="st-"] {{ font-family: "Geist", -apple-system, "Segoe UI", sans-serif; }}
.stApp {{ background: #ffffff; }}
.stButton > button, .stDownloadButton > button, .stFormSubmitButton > button {{
  border-radius: 0; border: 1px solid #161616; background: #161616; color: #fff; box-shadow: none; font-weight: 500;
}}
.stButton > button:hover {{ background: #000; color: #fff; border-color: #000; }}
.stTextInput input, .stNumberInput input, .stTextArea textarea,
[data-baseweb="select"] > div, [data-baseweb="input"] {{ border-radius: 0 !important; box-shadow: none !important; }}
[data-testid="stMetric"] {{ border: 1px solid #e5e5e5; padding: 14px 16px; }}
a {{ color: #db2400; }}
</style>""",
        unsafe_allow_html=True,
    )


st.set_page_config(page_title="Diametral × Streamlit", layout="wide")
inject_diametral()

st.markdown('<p class="ds-kicker" style="margin:0">Design system · Python</p>', unsafe_allow_html=True)
st.markdown('<h1 class="ds-title ds-title--xl" style="margin:2px 0 18px">Diametral × Streamlit</h1>', unsafe_allow_html=True)

# The signature stat band (visible grid system), rendered as HTML.
st.markdown(
    """
<div class="ds-statgrid">
  <div class="ds-statgrid__cell"><div class="ds-statgrid__label">Revenue</div><div class="ds-statgrid__value">€4.5M</div></div>
  <div class="ds-statgrid__cell"><div class="ds-statgrid__label">Avg. margin</div><div class="ds-statgrid__value">24.6%</div></div>
  <div class="ds-statgrid__cell"><div class="ds-statgrid__label">Projects</div><div class="ds-statgrid__value">86</div></div>
  <div class="ds-statgrid__cell"><div class="ds-statgrid__label">At-risk rate</div><div class="ds-statgrid__value">5.2%</div></div>
</div>
""",
    unsafe_allow_html=True,
)

left, right = st.columns(2)
with left:
    st.markdown('<div class="ds-gridlabel" style="margin:22px 0 10px">Native widgets, restyled</div>', unsafe_allow_html=True)
    st.text_input("Project name", "Project Atlas")
    st.selectbox("Stage", ["Discovery", "Design", "Build", "Scale", "Run"], index=2)
    st.slider("Target margin %", 0, 60, 24)
    st.button("Save changes")
    st.metric("Active projects", "86", "+8 this week")
with right:
    st.markdown('<div class="ds-gridlabel" style="margin:22px 0 10px">.ds-* blocks via st.markdown</div>', unsafe_allow_html=True)
    st.markdown(
        '<div class="ds-card" style="padding:16px 18px"><b>Project Atlas</b> &nbsp;'
        '<span class="ds-tag ds-tag--success">Run</span> <span class="ds-tag">data</span>'
        '<p style="color:var(--ds-ink-soft);margin:8px 0 0">A flat, structured pricing matrix that turns '
        'delegation thresholds, staffing and margin into one defensible number.</p></div>',
        unsafe_allow_html=True,
    )
    st.markdown('<div class="ds-callout ds-callout--info" style="margin-top:12px">Margins drive the delegation level on every mission.</div>', unsafe_allow_html=True)
    st.markdown('<div class="ds-callout ds-callout--warning" style="margin-top:12px">One project is below the 20% margin floor.</div>', unsafe_allow_html=True)
