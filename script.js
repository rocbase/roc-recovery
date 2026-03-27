const sceneData = {
  starting: {
    chip: 'STARTING SOON',
    mode: 'Starting Soon',
    title: 'Entering the void in <span>04:28</span>',
    description: 'Minimal center focus, distant sigil, atmospheric fog bands, and a ceremonial countdown framed by quiet electric dividers.',
    direction: '<p><strong>Starting Soon:</strong> ceremonial and suspenseful, with the reaper sigil distant in the void and the typography treated like a luxury title card.</p>',
    status: 'Ancient-future activation'
  },
  gameplay: {
    chip: 'GAMEPLAY',
    mode: 'Gameplay',
    title: 'Gameplay remains the hero <span>always</span>',
    description: 'Overlay elements retreat to the edges: razor-cut webcam frame, lower-third status rail, and minimal metadata anchors.',
    direction: '<p><strong>Gameplay:</strong> built for visibility first, keeping the action dominant while the identity lives in subtle rails, metallic cuts, and disciplined glows.</p>',
    status: 'Edge-only HUD framing'
  },
  chatting: {
    chip: 'JUST CHATTING',
    mode: 'Just Chatting',
    title: 'Conversation in a <span>luxury void</span>',
    description: 'A wider camera presence, asymmetrical information stack, and soft neon contouring turn the stream into a dark editorial set.',
    direction: '<p><strong>Just Chatting:</strong> the webcam becomes the anchor, supported by streetwear-luxury side panels and reaper-tech accent geometry.</p>',
    status: 'Editorial camera focus'
  },
  brb: {
    chip: 'BRB',
    mode: 'BRB',
    title: 'Signal suspended <span>briefly</span>',
    description: 'Faint orbit rings, quiet motion fields, and a restrained return message maintain atmosphere without cluttering the screen.',
    direction: '<p><strong>BRB:</strong> a stasis chamber mood—minimal information, elegant reassurance, and a gentle blue-violet shimmer holding the scene.</p>',
    status: 'Stasis / return shortly'
  },
  ending: {
    chip: 'ENDING',
    mode: 'Ending',
    title: 'Transmission fades with a <span>gold seal</span>',
    description: 'The final scene closes on a ceremonial crest hit, slow cosmic horizon glow, and clean sign-off space for socials or thanks.',
    direction: '<p><strong>Ending:</strong> the pack lands with prestige—quiet, powerful, and conclusive, using solar gold only as a final emblem signature.</p>',
    status: 'Ceremonial sign-off'
  }
};

const tabs = document.querySelectorAll('.scene-tab');
const stage = document.getElementById('scene-stage');
const chip = document.getElementById('scene-chip');
const mode = document.querySelector('.scene-mode');
const title = document.querySelector('.stage-copy h3');
const description = document.getElementById('scene-description');
const directionCopy = document.getElementById('direction-copy');
const statusModule = document.getElementById('status-module').querySelector('strong');

// Cache scene keys once instead of recomputing on every keypress.
const sceneKeys = Object.keys(sceneData);
// Track the active scene key to avoid scanning DOM classes on every keypress.
// Initialise to the first key so keyboard navigation works correctly from the start.
let currentSceneKey = sceneKeys[0];

function setScene(sceneKey) {
  const scene = sceneData[sceneKey];
  if (!scene) return;

  tabs.forEach((tab) => {
    const active = tab.dataset.scene === sceneKey;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });

  stage.className = `broadcast-stage glass-panel scene stage-${sceneKey}`;
  chip.textContent = scene.chip;
  mode.textContent = scene.mode;
  title.innerHTML = scene.title;
  description.textContent = scene.description;
  directionCopy.innerHTML = scene.direction;
  statusModule.textContent = scene.status;

  currentSceneKey = sceneKey;
}

// Use a single delegated listener instead of one listener per tab.
document.querySelector('.scene-selector').addEventListener('click', (event) => {
  const tab = event.target.closest('.scene-tab');
  if (tab) setScene(tab.dataset.scene);
});

window.addEventListener('keydown', (event) => {
  const currentIndex = sceneKeys.indexOf(currentSceneKey);

  if (event.key === 'ArrowRight') {
    setScene(sceneKeys[(currentIndex + 1) % sceneKeys.length]);
  }

  if (event.key === 'ArrowLeft') {
    setScene(sceneKeys[(currentIndex - 1 + sceneKeys.length) % sceneKeys.length]);
  }
});

setScene('starting');
