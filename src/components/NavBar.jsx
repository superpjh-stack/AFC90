const NAV_ITEMS = [
  { key: '홈',     label: '홈',      icon: '🏠' },
  { key: '캘린더', label: '캘린더',  icon: '📅' },
  { key: '신체변화', label: '신체변화', icon: '💪' },
  { key: '마이페이지', label: '마이페이지', icon: '👤' },
];

export default function NavBar({ currentPage, onNavigate }) {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[360px] z-50"
      style={{
        background: 'rgba(26,16,53,0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(124,58,237,0.2)',
        boxShadow: '0 -4px 24px rgba(124,58,237,0.15)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ key, label, icon }) => {
          const isActive = currentPage === key;
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px] active:scale-90"
              style={
                isActive
                  ? {
                      color: '#A78BFA',
                      fontSize: '10px',
                      fontWeight: 600,
                      background: 'rgba(124,58,237,0.15)',
                      boxShadow: '0 0 12px rgba(124,58,237,0.3)',
                    }
                  : {
                      color: 'rgba(167,139,250,0.5)',
                      fontSize: '10px',
                      fontWeight: 500,
                    }
              }
            >
              <span
                className="text-xl leading-none"
                style={
                  isActive
                    ? { filter: 'drop-shadow(0 0 6px rgba(124,58,237,0.7))' }
                    : { opacity: 0.6 }
                }
              >
                {icon}
              </span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
