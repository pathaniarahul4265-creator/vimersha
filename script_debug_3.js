
(function() {
  const signKeys = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];
  const aliases = {
    mesha: "aries",
    mesh: "aries",
    vrishabha: "taurus",
    vrishabh: "taurus",
    vrish: "taurus",
    mithuna: "gemini",
    mithun: "gemini",
    karka: "cancer",
    kark: "cancer",
    simha: "leo",
    singh: "leo",
    kanya: "virgo",
    tula: "libra",
    vrischika: "scorpio",
    vrischik: "scorpio",
    vrisch: "scorpio",
    dhanu: "sagittarius",
    dhanus: "sagittarius",
    makara: "capricorn",
    makar: "capricorn",
    kumbha: "aquarius",
    kumbh: "aquarius",
    meena: "pisces",
    meen: "pisces"
  };
  window.getZodiacSignKey = function(signStr) {
    if (!signStr)
      return "aries";
    const s = String(signStr).toLowerCase().trim().replace(/[^a-z]/g, "");
    if (signKeys.includes(s))
      return s;
    if (aliases[s])
      return aliases[s];
    for (const key of signKeys) {
      if (s.includes(key))
        return key;
    }
    for (const [alias, target] of Object.entries(aliases)) {
      if (s.includes(alias))
        return target;
    }
    return "aries";
  };
window.getZodiacSvgUrl = function(signStr) {
  const key = window.getZodiacSignKey(signStr);
  return `/images/zodiac/${key}.svg`;
};

window.handleZodiacImgError = function(imgEl, signKey) {
  if (!imgEl) return;

  const key = window.getZodiacSignKey(
    signKey || imgEl.getAttribute("data-sign") || imgEl.alt || "aries"
  );

  const count = parseInt(imgEl.dataset.retryCount || "0", 10);
  imgEl.dataset.retryCount = String(count + 1);

  if (count === 0) {
    imgEl.src = `/images/zodiac/${key}.png`;
  } else if (count === 1 && window.ZODIAC_EMBEDDED_SVGS && window.ZODIAC_EMBEDDED_SVGS[key]) {
    imgEl.src = window.ZODIAC_EMBEDDED_SVGS[key];
    imgEl.onerror = null;
  } else {
    imgEl.onerror = null;
  }
};

