import { useEffect, useRef, useState } from 'react';
import {
  BUSINESSES,
  getBusinessDefinition,
  isBusinessId,
  type BusinessId,
} from './game/businesses';
import { createGame } from './game/createGame';
import {
  GAME_RESET_EVENT,
  GAME_SAVE_KEY,
  GAME_STATE_EVENT,
  initialSnapshot,
  type GameSnapshot,
} from './game/events';

type Screen = 'landing' | 'selection' | 'game';

type LegacySave = Partial<GameSnapshot> & {
  businessOwned?: boolean;
};

function readSavedBusiness(): BusinessId | null {
  try {
    const raw = localStorage.getItem(GAME_SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LegacySave;
    if (isBusinessId(parsed.businessId)) return parsed.businessId;
    return parsed.businessOwned ? 'lancheria' : null;
  } catch {
    return null;
  }
}

export default function App() {
  const gameHostRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<ReturnType<typeof createGame> | null>(null);
  const [snapshot, setSnapshot] = useState<GameSnapshot>(initialSnapshot);
  const [screen, setScreen] = useState<Screen>('landing');
  const [savedBusiness, setSavedBusiness] = useState<BusinessId | null>(() => readSavedBusiness());
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessId | null>(() => readSavedBusiness());

  useEffect(() => {
    const onState = (event: Event) => {
      const customEvent = event as CustomEvent<GameSnapshot>;
      setSnapshot(customEvent.detail);
      if (customEvent.detail.businessId) setSavedBusiness(customEvent.detail.businessId);
    };
    window.addEventListener(GAME_STATE_EVENT, onState);
    return () => window.removeEventListener(GAME_STATE_EVENT, onState);
  }, []);

  useEffect(() => {
    if (screen !== 'game' || !selectedBusiness || !gameHostRef.current || gameRef.current) return;
    gameRef.current = createGame(gameHostRef.current, selectedBusiness);
    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [screen, selectedBusiness]);

  const continueGame = () => {
    if (!savedBusiness) {
      setScreen('selection');
      return;
    }
    setSelectedBusiness(savedBusiness);
    setScreen('game');
  };

  const beginNewGame = (confirmReset = true) => {
    if (confirmReset && savedBusiness && !window.confirm('Começar um novo jogo e apagar o save local atual?')) return;
    window.dispatchEvent(new Event(GAME_RESET_EVENT));
    localStorage.removeItem(GAME_SAVE_KEY);
    setSnapshot(initialSnapshot);
    setSavedBusiness(null);
    setSelectedBusiness(null);
    setScreen('selection');
  };

  const chooseBusiness = (businessId: BusinessId) => {
    localStorage.removeItem(GAME_SAVE_KEY);
    setSnapshot(initialSnapshot);
    setSelectedBusiness(businessId);
    setScreen('game');
  };

  const resetFromGame = () => {
    if (!window.confirm('Recomeçar a V0.1 e escolher outro negócio?')) return;
    beginNewGame(false);
  };

  if (screen === 'landing') {
    const savedDefinition = savedBusiness ? getBusinessDefinition(savedBusiness) : null;

    return (
      <main className="landing-shell">
        <section className="landing-card">
          <div className="brand-badge">PT</div>
          <p className="eyebrow">MOBI GAMES • VERTICAL SLICE WEB</p>
          <h1>Pelotas <span>Tycoon</span></h1>
          <p className="intro">
            Todo grande negócio começa pequeno. Sua primeira jornada empresarial nasce na Praia do Laranjal.
          </p>

          <div className="landing-actions">
            <button className="primary-button" onClick={savedBusiness ? continueGame : () => setScreen('selection')}>
              {savedBusiness ? `Continuar ${savedDefinition?.name ?? ''}` : 'Jogar agora'}
            </button>
            {savedBusiness && (
              <button className="ghost-button" onClick={() => beginNewGame(true)}>Novo jogo</button>
            )}
          </div>

          <p className="microcopy">V0.1 • 2.5D/cartoon • save local • navegador + Android</p>
        </section>
      </main>
    );
  }

  if (screen === 'selection') {
    return (
      <main className="landing-shell">
        <section className="selection-card">
          <p className="eyebrow">CAPÍTULO 1 • O PRIMEIRO NEGÓCIO</p>
          <h2>O que você vai construir aqui?</h2>
          <p className="selection-intro">
            Todos usam o mesmo motor de gameplay, mas cada negócio muda o ritmo da produção e da demanda.
          </p>

          <div className="business-grid">
            {BUSINESSES.map((business) => (
              <button
                key={business.id}
                className="business-option"
                style={{ borderColor: business.colorCss }}
                onClick={() => chooseBusiness(business.id)}
              >
                <span className="business-swatch" style={{ background: business.colorCss }} />
                <strong>{business.name}</strong>
                <span>{business.starterProduct}</span>
                <small>{business.identity}</small>
                <b>{business.saleValue} moedas por venda</b>
              </button>
            ))}
          </div>

          <button className="ghost-button selection-back" onClick={() => setScreen('landing')}>Voltar</button>
        </section>
      </main>
    );
  }

  const business = snapshot.businessId
    ? getBusinessDefinition(snapshot.businessId)
    : selectedBusiness
      ? getBusinessDefinition(selectedBusiness)
      : null;

  return (
    <main className="game-page">
      <section className="game-shell">
        <header className="hud">
          <div>
            <span className="hud-label">Caixa</span>
            <strong>{snapshot.cash.toLocaleString('pt-BR')} moedas</strong>
          </div>
          <div>
            <span className="hud-label">Atendidos</span>
            <strong>{snapshot.served}</strong>
          </div>
          <div>
            <span className="hud-label">Negócio</span>
            <strong>{business?.name ?? '—'} · Nv. {snapshot.businessLevel}</strong>
          </div>
        </header>

        <div className="game-stage" ref={gameHostRef} aria-label="Área jogável do Pelotas Tycoon" />

        <footer className="game-controls">
          <div className="objective-box">
            <span>Objetivo atual</span>
            <strong>{snapshot.objective}</strong>
          </div>

          <p>{snapshot.message}</p>

          <div className="control-row">
            <span>Fila {snapshot.queue}/4 {snapshot.canUpgrade ? '• melhoria disponível' : ''}</span>
            <button className="secondary-button" onClick={resetFromGame}>Novo jogo</button>
          </div>

          <small>
            Toque no chão para mover. Insumos, preparo, balcão, caixa e melhorias funcionam automaticamente por proximidade.
          </small>
        </footer>
      </section>
    </main>
  );
}
