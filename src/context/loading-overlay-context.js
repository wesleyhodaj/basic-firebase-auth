const {createContext, useContext, useState} = require('react');

const LoadingOverlayContext = createContext({
  isLoading: false,
  setLoading: null,
});

export function LoadingOverlayContextProvider({children}) {
  const [loading, setLoading] = useState(false);
  const value = {loading, setLoading};
  return (
    <LoadingOverlayContext.Provider value={value}>
      {children}
    </LoadingOverlayContext.Provider>
  );
}
export function useLoading() {
  const context = useContext(LoadingOverlayContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}
