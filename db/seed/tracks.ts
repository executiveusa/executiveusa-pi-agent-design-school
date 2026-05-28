export const MVP_TRACKS = [
  {
    slug: "documentary-prompt-specialist",
    name: "Documentary Prompt Specialist",
    track: "documentary-prompt-specialist",
    description:
      "Master the craft of documentary visual storytelling through structured prompt engineering. Learn to direct truth-sensitive interviews, craft observational shot lists, and build narrative arcs that feel discovered, not constructed.",
    agentReadableSummary:
      "Train to produce production-ready documentary prompts including story structures, interview direction, observational shot lists, and truth-sensitive visual plans. Pass rate: 75% minimum across all rubric criteria.",
    outcome:
      "Agent can create production-ready documentary prompts, story structures, interview direction, shot lists, and truth-sensitive visual plans.",
    promptPackSlugs: ["documentary-essentials"],
    evalRubric: {
      rubricId: "documentary-v1",
      passThreshold: 0.75,
      criteria: [
        {
          key: "prompt_body_length",
          label: "Prompt completeness",
          weight: 0.2,
          required: true,
        },
        {
          key: "shot_type_present",
          label: "Shot type specified",
          weight: 0.15,
          required: true,
        },
        {
          key: "mood_present",
          label: "Mood / tone present",
          weight: 0.15,
          required: true,
        },
        {
          key: "truth_sensitive",
          label: "No fabricated testimony",
          weight: 0.25,
          required: true,
        },
        {
          key: "subject_present",
          label: "Subject specified",
          weight: 0.15,
          required: false,
        },
        {
          key: "safety_clean",
          label: "No unsafe content",
          weight: 0.1,
          required: true,
        },
      ],
    },
    graduationRequirements: {
      minEvalsPasssed: 3,
      minScore: 0.75,
      requiredModules: ["foundations", "interview-direction", "shot-craft"],
    },
    status: "active",
  },
  {
    slug: "anime-scene-specialist",
    name: "Anime Scene Specialist",
    track: "anime-scene-specialist",
    description:
      "Master anime visual language for AI generation. Learn character consistency, cinematic composition, cel-shading lighting patterns, sakuga motion direction, and emotional scene continuity across multi-panel sequences.",
    agentReadableSummary:
      "Train to create anime scene prompts with consistent characters, cinematic composition, motion direction, lighting, and emotional continuity. Requires understanding of anime visual vocabulary and frame-to-frame consistency techniques.",
    outcome:
      "Agent can create anime scene prompts with consistent characters, cinematic composition, motion, lighting, and emotional continuity.",
    promptPackSlugs: ["anime-scene-starters"],
    evalRubric: {
      rubricId: "anime-v1",
      passThreshold: 0.75,
      criteria: [
        {
          key: "prompt_body_length",
          label: "Prompt completeness",
          weight: 0.15,
          required: true,
        },
        {
          key: "character_consistency",
          label: "Character description consistent",
          weight: 0.25,
          required: true,
        },
        {
          key: "shot_type_present",
          label: "Shot type specified",
          weight: 0.15,
          required: true,
        },
        {
          key: "lighting_present",
          label: "Lighting described",
          weight: 0.2,
          required: false,
        },
        {
          key: "mood_present",
          label: "Emotional tone present",
          weight: 0.15,
          required: true,
        },
        {
          key: "safety_clean",
          label: "No unsafe content",
          weight: 0.1,
          required: true,
        },
      ],
    },
    graduationRequirements: {
      minEvalsPasssed: 3,
      minScore: 0.75,
      requiredModules: ["anime-vocabulary", "character-craft", "scene-sequence"],
    },
    status: "active",
  },
  {
    slug: "ugc-content-agent",
    name: "UGC Content Agent",
    track: "ugc-content-agent",
    description:
      "Master the art of authentic user-generated content strategy. Learn hook engineering, social platform nuances, authentic voice without deceptive testimonials, and conversion-optimized UGC frameworks.",
    agentReadableSummary:
      "Train to produce authentic UGC scripts, scroll-stopping hooks, shot lists, and platform-specific content plans. Must avoid deceptive testimonial patterns and comply with FTC guidelines.",
    outcome:
      "Agent can produce authentic UGC scripts, hooks, shot lists, and platform-specific content plans without deceptive testimonials.",
    promptPackSlugs: ["ugc-hook-library"],
    evalRubric: {
      rubricId: "ugc-v1",
      passThreshold: 0.75,
      criteria: [
        {
          key: "prompt_body_length",
          label: "Script completeness",
          weight: 0.15,
          required: true,
        },
        {
          key: "hook_present",
          label: "Opening hook present",
          weight: 0.25,
          required: true,
        },
        {
          key: "no_fake_testimonial",
          label: "No fabricated testimonials",
          weight: 0.25,
          required: true,
        },
        {
          key: "platform_specified",
          label: "Platform context specified",
          weight: 0.15,
          required: false,
        },
        {
          key: "cta_present",
          label: "Call to action present",
          weight: 0.1,
          required: false,
        },
        {
          key: "safety_clean",
          label: "No unsafe content",
          weight: 0.1,
          required: true,
        },
      ],
    },
    graduationRequirements: {
      minEvalsPasssed: 3,
      minScore: 0.75,
      requiredModules: ["ugc-foundations", "hook-engineering", "platform-craft"],
    },
    status: "active",
  },
  {
    slug: "music-video-prompt-specialist",
    name: "Music Video Prompt Specialist",
    track: "music-video-prompt-specialist",
    description:
      "Learn to translate audio energy into visual language. Master rhythm-responsive shot design, mood-to-camera-motion mapping, visual motif development, and the cinematic grammar that makes music videos feel inevitable.",
    agentReadableSummary:
      "Train to design music-video prompts with rhythm-responsive shot design, mood-camera-motion mapping, visual motifs, transition language, and audio/visual alignment. Must demonstrate understanding of music video visual grammar.",
    outcome:
      "Agent can design music-video prompts with rhythm, mood, camera motion, transitions, visual motifs, and audio/visual alignment.",
    promptPackSlugs: ["music-video-starters"],
    evalRubric: {
      rubricId: "music-video-v1",
      passThreshold: 0.75,
      criteria: [
        {
          key: "prompt_body_length",
          label: "Prompt completeness",
          weight: 0.15,
          required: true,
        },
        {
          key: "camera_motion_present",
          label: "Camera motion described",
          weight: 0.2,
          required: true,
        },
        {
          key: "mood_present",
          label: "Mood / energy specified",
          weight: 0.2,
          required: true,
        },
        {
          key: "rhythm_reference",
          label: "Rhythm or tempo reference",
          weight: 0.2,
          required: false,
        },
        {
          key: "visual_motif",
          label: "Visual motif described",
          weight: 0.15,
          required: false,
        },
        {
          key: "safety_clean",
          label: "No unsafe content",
          weight: 0.1,
          required: true,
        },
      ],
    },
    graduationRequirements: {
      minEvalsPasssed: 3,
      minScore: 0.75,
      requiredModules: [
        "mv-visual-grammar",
        "rhythm-motion-mapping",
        "motif-design",
      ],
    },
    status: "active",
  },
  {
    slug: "product-brand-film-specialist",
    name: "Product / Brand Film Specialist",
    track: "product-brand-film-specialist",
    description:
      "Master cinematic product and brand film direction. Learn how to make objects feel aspirational, how to build brand trust through visual restraint, and how to engineer conversion without sacrificing cinematic integrity.",
    agentReadableSummary:
      "Train to create product and brand film prompts optimized for cinematic clarity, conversion, trust, and brand consistency. Must demonstrate understanding of product hero shots, brand color language, and trust-building visual cues.",
    outcome:
      "Agent can create product and brand film prompts optimized for cinematic clarity, conversion, trust, and brand consistency.",
    promptPackSlugs: ["brand-film-essentials"],
    evalRubric: {
      rubricId: "brand-film-v1",
      passThreshold: 0.75,
      criteria: [
        {
          key: "prompt_body_length",
          label: "Prompt completeness",
          weight: 0.15,
          required: true,
        },
        {
          key: "product_featured",
          label: "Product / brand featured",
          weight: 0.25,
          required: true,
        },
        {
          key: "shot_type_present",
          label: "Shot type specified",
          weight: 0.15,
          required: true,
        },
        {
          key: "lighting_present",
          label: "Lighting described",
          weight: 0.2,
          required: true,
        },
        {
          key: "brand_tone",
          label: "Brand tone communicated",
          weight: 0.15,
          required: false,
        },
        {
          key: "safety_clean",
          label: "No unsafe content",
          weight: 0.1,
          required: true,
        },
      ],
    },
    graduationRequirements: {
      minEvalsPasssed: 3,
      minScore: 0.75,
      requiredModules: ["brand-film-craft", "product-hero", "trust-signals"],
    },
    status: "active",
  },
];
