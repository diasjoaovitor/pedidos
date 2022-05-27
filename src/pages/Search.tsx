import { Divider, ListItem } from "@mui/material"
import { Card, Chip, GoBack, Header, Layout, Loader, NotificationModal, ProductModal, SearchCardItem } from "../shared/components"
import { useSearch } from "../shared/hooks"
import { TProductPresentation } from "../shared/types"

export const Search: React.FC = () => {
  const { 
    chips,
    setProductPresentationContext,
    filteredProducts,
    filteredCompanies,
    product, setProduct,
    addChip, removeChip,
    handleSearch, handleUpdate, handleDelete,
    modal, setModal,
    message, setMessage,
    loader
  } = useSearch()
  
  return (
    <>
    <Header title="Pesquisa">
      <GoBack handleClick={() => setProductPresentationContext({} as TProductPresentation)} />
    </Header>
    <Layout 
      autoFocus={true} 
      handleChange={e => handleSearch([e.currentTarget.value])} 
    >
      <Chip 
        chips={chips} 
        handleSubmit={addChip}
        handleDelete={removeChip} 
      />
      <Card title="Empresas" totalItems={filteredCompanies.length}>
        {filteredCompanies.map((company, i) => (
          <div key={i}>
            <ListItem>{company}</ListItem>
            <Divider />
          </div>
        ))}
      </Card>
      <Card title="Produtos" totalItems={filteredProducts.length}>
        {filteredProducts.map((product, i) => (
          <SearchCardItem 
            key={i} product={product} 
            handleClick={() => {
              setProduct(product)
              setModal(true)
            }} 
          />
        ))}
      </Card>
    </Layout>
    {modal && <ProductModal 
      product={product} 
      handleClose={() => setProduct(undefined)}
      handleUpdate={handleUpdate} 
      handleDelete={handleDelete} 
    />}
    <NotificationModal message={message} handleClose={() => setMessage('')} />
    <Loader open={loader} />
    </>
  )
}
  