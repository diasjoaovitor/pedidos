import { useEffect, useState } from "react"
import { Layout, Card, Loader, Header, Menu, HomeCardItem, NotificationModal } from "../shared/components"
import { getHomeData } from "../shared/functions"
import { useQueryHome } from "../shared/graphql"

export const Home: React.FC = () => {
  const { data, error } = useQueryHome()
  
  const [ companies, setCompanies ] = useState<string[]>([])
  const [ products, setProducts ] = useState<string[]>([])
  const [ message, setMessage ] = useState('')
  const [ loader, setLoader ] = useState(true)

  useEffect(() => {
    if(data) {
      const { companies, products } = getHomeData(data)
      setCompanies(companies)
      setProducts(products)
    }
  }, [data])

  useEffect(() => {
    if(error) {
      setMessage('Algo deu errado!')
    }
    setLoader(false)
  }, [error])

  return (
    <>
    <Header title="Pedidos">
      <Menu />
    </Header>
    <Layout>
      <Card title="Empresas">
        {companies.map((company, i) => <HomeCardItem key={i} item={company} />)}
      </Card>
      <Card title="Produtos">
        {products.map((product, i) => <HomeCardItem key={i} item={product} />)}
      </Card>
    </Layout>
    <NotificationModal message={message} handleClose={() => setMessage('')}/>
    {loader && <Loader />}
    </>
  )
}
