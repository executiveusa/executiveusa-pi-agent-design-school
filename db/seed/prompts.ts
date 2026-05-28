import crypto from "crypto";

function hash(body: string) {
  return crypto.createHash("sha256").update(body.trim()).digest("hex");
}

export const SEED_PROMPTS = [
  {
    title: "Observational Documentary — Street Interview",
    body: "A fly-on-the-wall documentary scene. Subject: elderly street vendor in a busy market. Shot type: tight close-up on hands arranging produce, then slow pull-back to reveal the surrounding chaos. Camera: handheld with slight drift. Lighting: harsh midday sun, deep shadows between stalls. Mood: quiet dignity amid noise. No interview prompts visible. No staged moments. The camera observes, never directs.",
    track: "documentary",
    shotType: "close-up to wide",
    cameraMotion: ["handheld", "pull-back"],
    subject: ["street vendor", "market"],
    mood: ["quiet dignity", "observational"],
    lighting: ["harsh midday", "deep shadow contrast"],
    safetyFlags: [],
    evalCriteria: [
      "no staged moments",
      "no fabricated dialogue",
      "observational style",
    ],
    agentReadableSummary:
      "Documentary close-up to wide shot of street vendor. Handheld, observational. No staged moments. Truth-sensitive.",
    contentHash: hash(
      "A fly-on-the-wall documentary scene. Subject: elderly street vendor in a busy market."
    ),
  },
  {
    title: "Anime Scene — Sakura Rooftop Confession",
    body: "Anime scene, soft cel-shading. Two high school students on a rooftop at golden hour. Sakura petals fall in slow motion (6fps blur stutter). Close-up on girl's face: eyes glistening, mouth slightly open. Cut to boy's profile, wind moving hair. Camera: slow pan, eye-level. Lighting: warm amber backlight, soft purple shadow fill. Mood: bittersweet anticipation. Studio: Kyoto Animation aesthetic. Consistent character design throughout.",
    track: "anime",
    shotType: "close-up to profile",
    cameraMotion: ["slow pan", "static hold"],
    subject: ["high school students", "rooftop", "sakura"],
    mood: ["bittersweet", "anticipatory"],
    lighting: ["golden hour backlight", "purple shadow fill"],
    safetyFlags: [],
    evalCriteria: [
      "consistent character design",
      "mood specified",
      "lighting described",
    ],
    agentReadableSummary:
      "KyoAni-style anime confession scene. Rooftop, golden hour, sakura. Consistent characters. Emotional restraint.",
    contentHash: hash(
      "Anime scene, soft cel-shading. Two high school students on a rooftop at golden hour."
    ),
  },
  {
    title: "UGC Hook — Skincare Transformation",
    body: "UGC video, 15-second format. Platform: TikTok. Hook (0–2s): tight close-up on skin texture before, raw and unflattering — real, not staged. Mid (2–12s): person applies product naturally, talking to camera in casual tone: 'I've been using this for 30 days and honestly I didn't expect this.' No scripted testimonial language. End (12–15s): natural reaction shot, product visible. CTA: 'Link in bio.' Authentic voice, no actress. No fabricated before/after claims.",
    track: "ugc",
    shotType: "close-up to medium",
    cameraMotion: ["static", "slight handheld"],
    subject: ["skincare", "product demonstration"],
    mood: ["authentic", "casual", "relatable"],
    lighting: ["natural daylight", "ring light optional"],
    safetyFlags: ["no fabricated claims"],
    evalCriteria: ["hook present", "no fake testimonial", "cta present"],
    agentReadableSummary:
      "15s TikTok UGC skincare hook. Authentic voice, no fabricated testimonial. Hook at 0-2s. FTC compliant framing.",
    contentHash: hash(
      "UGC video, 15-second format. Platform: TikTok. Hook (0–2s): tight close-up on skin texture before."
    ),
  },
  {
    title: "Music Video — Industrial Synth, Warehouse Scene",
    body: "Music video scene, industrial aesthetic. Setting: abandoned warehouse, concrete floors, chain-link shadows. Beat: 140 BPM hard synth. Camera: wide establishing shot snaps to tight close-up on beat 1 of bar 4. Motion: Dutch angle static, cut to whip-pan on chorus. Strobe effect on drop (4 frames on, 2 off). Subject: solo dancer, minimal costume, geometric makeup. Lighting: single red key light from above, neon blue fill from floor. Visual motif: spinning industrial gears in reflection. Mood: urgent, claustrophobic power.",
    track: "music_video",
    shotType: "wide to close-up",
    cameraMotion: ["whip-pan", "dutch angle", "static snap"],
    subject: ["dancer", "warehouse", "industrial"],
    mood: ["urgent", "claustrophobic", "powerful"],
    lighting: ["red key from above", "neon blue fill floor"],
    references: ["NIN Closer", "Crystal Castles"],
    safetyFlags: [],
    evalCriteria: [
      "camera motion present",
      "rhythm reference",
      "visual motif described",
    ],
    agentReadableSummary:
      "140 BPM industrial music video. Warehouse, strobe, Dutch angle. Beat-locked cuts. Red/blue lighting. Rhythm-responsive direction.",
    contentHash: hash(
      "Music video scene, industrial aesthetic. Setting: abandoned warehouse, concrete floors."
    ),
  },
  {
    title: "Product Hero Shot — Luxury Perfume",
    body: "Cinematic product hero shot, luxury perfume. Subject: dark glass bottle, gold cap, minimal branding. Shot type: extreme close-up macro on bottle surface — condensation beads catching light. Camera: micro dolly push-in, imperceptibly slow. Lighting: single soft overhead key, warm 3200K; subtle side fill creating depth in glass. Background: deep black, bokeh suggestion of velvet fabric. Duration: 8 seconds. Mood: restraint, desire, refinement. No voiceover. No text overlay. Product must be primary subject throughout. Color grade: rich shadows, muted highlights, warm gold channel.",
    track: "product_video",
    shotType: "extreme close-up macro",
    cameraMotion: ["micro dolly push"],
    subject: ["perfume bottle", "luxury product"],
    mood: ["restrained desire", "refined"],
    lighting: ["warm overhead key", "subtle side fill"],
    safetyFlags: [],
    evalCriteria: ["product featured", "lighting described", "shot type present"],
    agentReadableSummary:
      "8s luxury perfume hero macro shot. Micro dolly push. Single warm key. Deep black background. No text. Product primary throughout.",
    contentHash: hash(
      "Cinematic product hero shot, luxury perfume. Subject: dark glass bottle, gold cap."
    ),
  },
];
