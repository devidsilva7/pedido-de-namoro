/* ============================================================
   BLOQUEIO INICIAL & PRÉ-CARREGAMENTO DO ÁUDIO
============================================================ */
const audioElem = document.getElementById('audio-fundo');

if (audioElem) {
  audioElem.preload = "auto";
  audioElem.loop = true;

  audioElem.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play().catch(error => console.log("Erro ao reiniciar áudio:", error));
  });
}

/* ============================================================
   ANIMAÇÕES DE FUNDO (PÉTALAS E BRILHOS)
============================================================ */
const container = document.getElementById('falling-container');
const simbolos = ['🌸', '💗', '🌹', '💕', '✿'];
const totalItens = window.innerWidth < 768 ? 16 : 26;

if (container) {
  for (let i = 0; i < totalItens; i++) {
    const item = document.createElement('div');
    item.className = 'falling-item';
    item.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];

    const tamanho = Math.random() * 16 + 14;
    const posX = Math.random() * 100;
    const duracao = Math.random() * 8 + 9;
    const atraso = Math.random() * 10;
    const deriva = (Math.random() * 100 - 50) + 'px';

    item.style.left = posX + 'vw';
    item.style.fontSize = tamanho + 'px';
    item.style.animationDuration = duracao + 's';
    item.style.animationDelay = atraso + 's';
    item.style.setProperty('--drift', deriva);

    container.appendChild(item);
  }

  const totalBrilhos = window.innerWidth < 768 ? 14 : 24;
  for (let i = 0; i < totalBrilhos; i++) {
    const brilho = document.createElement('div');
    brilho.className = 'sparkle';
    brilho.style.left = (Math.random() * 100) + 'vw';
    brilho.style.top = (Math.random() * 100) + 'vh';
    brilho.style.animationDelay = (Math.random() * 4) + 's';
    brilho.style.animationDuration = (Math.random() * 2 + 3) + 's';
    container.appendChild(brilho);
  }
}

/* ============================================================
   ROLAGEM E FADE-IN
============================================================ */
const elementosFade = document.querySelectorAll('.fade-in');
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

elementosFade.forEach(el => observador.observe(el));

/* ============================================================
   INICIAR EXPERIÊNCIA (DESBLOQUEIO + MÚSICA + ROLAGEM)
============================================================ */
function iniciarExperiencia() {
  // Libera a rolagem da página
  document.body.classList.remove('bloqueado');

  // Toca a música de fundo
  const audio = document.getElementById('audio-fundo');
  if (audio && audio.paused) {
    audio.currentTime = 0;
    toggleMusica();
  }

  // Desliza suavemente até a seção de fotos
  const secaoFotos = document.getElementById('fotos');
  if (secaoFotos) {
    secaoFotos.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ============================================================
   BOTÃO "NÃO" FLUTUANTE (DENTRO DA ÁREA DO PEDIDO)
============================================================ */
const btnNao = document.getElementById('btn-nao');
const containerPedido = document.querySelector('.botoes-pedido');

if (btnNao && containerPedido) {
  function moverBotaoNao() {
    const rectContainer = containerPedido.getBoundingClientRect();
    const larguraBtn = btnNao.offsetWidth;
    const alturaBtn = btnNao.offsetHeight;

    // Calcula os limites dentro da área de botões da pergunta
    const maxLeft = rectContainer.width - larguraBtn;
    const maxTop = rectContainer.height - alturaBtn;

    const novoX = Math.max(0, Math.floor(Math.random() * maxLeft));
    const novoY = Math.max(0, Math.floor(Math.random() * maxTop));

    btnNao.style.position = 'absolute';
    btnNao.style.left = `${novoX}px`;
    btnNao.style.top = `${novoY}px`;
  }

  btnNao.addEventListener('mouseenter', moverBotaoNao);
  btnNao.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moverBotaoNao();
  }, { passive: false });
  btnNao.addEventListener('click', (e) => {
    e.preventDefault();
    moverBotaoNao();
  });
}

/* ============================================================
   CONTROLE DA MÚSICA DE FUNDO
============================================================ */
function toggleMusica() {
  const audio = document.getElementById('audio-fundo');
  const musicBtn = document.getElementById('music-player');
  const musicIcon = document.getElementById('music-icon');
  const musicText = document.getElementById('music-text');

  if (!audio) return;

  if (audio.paused) {
    audio.play().then(() => {
      if (musicBtn) musicBtn.classList.add('tocando');
      if (musicIcon) musicIcon.textContent = '🎶';
      if (musicText) musicText.textContent = 'Pausar';
    }).catch(error => {
      console.log("Erro ao reproduzir o áudio:", error);
    });
  } else {
    audio.pause();
    if (musicBtn) musicBtn.classList.remove('tocando');
    if (musicIcon) musicIcon.textContent = '🎵';
    if (musicText) musicText.textContent = 'Tocar Música';
  }
}

/* ============================================================
   CELEBRAÇÃO (AO CLICAR EM "SIM")
============================================================ */
function celebrar() {
  const telaCelebracao = document.getElementById('celebracao');
  if (telaCelebracao) {
    telaCelebracao.classList.add('ativo');
  }

  const audio = document.getElementById('audio-fundo');
  if (audio && audio.paused) {
    toggleMusica();
  }

  dispararConfetes();
}

function dispararConfetes() {
  const emojisConfete = ['🎉', '💖', '🌸', '💐', '✨', '🌹'];
  const totalConfetes = 90;

  for (let i = 0; i < totalConfetes; i++) {
    setTimeout(() => {
      const confete = document.createElement('div');
      confete.className = 'confete';
      confete.textContent = emojisConfete[Math.floor(Math.random() * emojisConfete.length)];
      confete.style.left = Math.random() * 100 + 'vw';
      confete.style.fontSize = (Math.random() * 18 + 14) + 'px';
      confete.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
      document.body.appendChild(confete);

      setTimeout(() => confete.remove(), 5000);
    }, i * 40);
  }
}