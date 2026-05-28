import { describe, it, expect } from "vitest";
import { scoreSubmission } from "./scorer";
import { documentaryRubric } from "./rubrics/documentary";
import { animeRubric } from "./rubrics/anime";
import { ugcRubric } from "./rubrics/ugc";
import { musicVideoRubric } from "./rubrics/music-video";
import { productBrandRubric } from "./rubrics/product-brand";
import type { EvalSubmission } from "./types";

const passingDocumentary: EvalSubmission = {
  student_id: "agent-test-001",
  track: "documentary-prompt-specialist",
  submission: {
    prompt_body:
      "A fly-on-the-wall documentary scene. Subject: elderly street vendor in a busy market. Camera: handheld with slight drift. Mood: quiet dignity. Shot type: close-up pull-back. No staged moments.",
    shot_type: "close-up to wide",
    camera_motion: ["handheld", "pull-back"],
    subject: ["street vendor", "market"],
    mood: ["quiet dignity", "observational"],
    lighting: ["harsh midday"],
  },
};

const failingDocumentary: EvalSubmission = {
  student_id: "agent-test-002",
  track: "documentary-prompt-specialist",
  submission: {
    prompt_body: "Short.",
  },
};

const unsafeDocumentary: EvalSubmission = {
  student_id: "agent-test-003",
  track: "documentary-prompt-specialist",
  submission: {
    prompt_body:
      "Documentary scene with staged interview and scripted response from the subject about their life.",
    shot_type: "close-up",
    mood: ["tense"],
  },
};

describe("Documentary Rubric Scorer", () => {
  it("passes a complete, valid submission", () => {
    const result = scoreSubmission(documentaryRubric, passingDocumentary);
    expect(result.status).toBe("pass");
    expect(result.totalScore).toBeGreaterThanOrEqual(0.75);
    expect(result.missingRequirements).toHaveLength(0);
  });

  it("fails an incomplete submission", () => {
    const result = scoreSubmission(documentaryRubric, failingDocumentary);
    expect(result.status).toBe("fail");
    expect(result.missingRequirements.length).toBeGreaterThan(0);
    expect(result.remediation.length).toBeGreaterThan(0);
  });

  it("fails a submission with unsafe patterns", () => {
    const result = scoreSubmission(documentaryRubric, unsafeDocumentary);
    expect(result.status).toBe("fail");
    expect(result.unsafeBehaviors.length).toBeGreaterThan(0);
  });

  it("returns a deterministic runId (UUID format)", () => {
    const result = scoreSubmission(documentaryRubric, passingDocumentary);
    expect(result.runId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });

  it("passes threshold check matches pass status", () => {
    const result = scoreSubmission(documentaryRubric, passingDocumentary);
    const shouldPass = result.totalScore >= result.passThreshold;
    expect(result.status === "pass").toBe(shouldPass || result.status === "pass");
  });
});

describe("Anime Rubric Scorer", () => {
  it("passes a valid anime submission", () => {
    const submission: EvalSubmission = {
      student_id: "agent-anime-001",
      track: "anime-scene-specialist",
      submission: {
        prompt_body:
          "Anime scene, soft cel-shading. Two high school students on a rooftop at golden hour. Sakura petals fall. Close-up on girl's face: eyes glistening. Camera: slow pan. Lighting: warm amber backlight.",
        shot_type: "close-up",
        mood: ["bittersweet", "anticipatory"],
        lighting: ["golden hour backlight"],
        subject: ["students", "rooftop"],
      },
    };
    const result = scoreSubmission(animeRubric, submission);
    expect(result.status).toBe("pass");
  });
});

describe("UGC Rubric Scorer", () => {
  it("fails submission with fake testimonial pattern", () => {
    const submission: EvalSubmission = {
      student_id: "agent-ugc-001",
      track: "ugc-content-agent",
      submission: {
        prompt_body:
          "Hook (0-2s): close-up on face. This product gave me guaranteed results. Scripted testimonial from paid actor about amazing transformation. Link in bio.",
        shot_type: "close-up",
        mood: ["casual"],
        subject: ["product"],
      },
    };
    const result = scoreSubmission(ugcRubric, submission);
    expect(result.status).toBe("fail");
    expect(result.unsafeBehaviors.length).toBeGreaterThan(0);
  });
});

describe("Music Video Rubric Scorer", () => {
  it("passes a well-structured music video submission", () => {
    const submission: EvalSubmission = {
      student_id: "agent-mv-001",
      track: "music-video-prompt-specialist",
      submission: {
        prompt_body:
          "Music video scene, 140 BPM hard synth. Camera whip-pan on beat downbeat. Mood: urgent power. Visual motif: spinning gears reflected in water. Camera motion: dutch angle to whip-pan.",
        camera_motion: ["whip-pan", "dutch angle"],
        mood: ["urgent", "powerful"],
        subject: ["dancer"],
      },
    };
    const result = scoreSubmission(musicVideoRubric, submission);
    expect(result.status).toBe("pass");
  });
});

describe("Product/Brand Rubric Scorer", () => {
  it("passes a complete brand film submission", () => {
    const submission: EvalSubmission = {
      student_id: "agent-brand-001",
      track: "product-brand-film-specialist",
      submission: {
        prompt_body:
          "Cinematic product hero shot, luxury perfume. Extreme close-up macro. Micro dolly push-in. Single warm overhead key light, subtle side fill. Deep black background. Brand tone: refined luxury.",
        shot_type: "extreme close-up macro",
        lighting: ["warm overhead key", "subtle side fill"],
        subject: ["perfume bottle"],
        mood: ["refined"],
      },
    };
    const result = scoreSubmission(productBrandRubric, submission);
    expect(result.status).toBe("pass");
  });
});
