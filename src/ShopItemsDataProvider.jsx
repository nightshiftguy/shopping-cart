const Context = React.createContext();

export const ShopItemsDataProvider = ({ children }) => {
  const [shopItems, setShopItems] = useState();

  useEffect(async () => {
    fetch('https://fakestoreapi.com/products')
      .then((data) => data.json())
      .then((data) => setShopItems(data));
  }, []);

  return (
    <Context.Provider value={shopItems}>
      {children}
    </Context.Provider>
  );
};

export const useShopItems = () => useContext(Context);