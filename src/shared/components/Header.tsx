import { Container, Toolbar, Typography } from "@mui/material"
import { Menu } from "./Menu"
import { ToggleTheme } from "./ToggleTheme"
import { GoBack } from "./GoBack"
import { ReactNode } from "react"

type Props = {
  title: string
  children: ReactNode
}
export const Header: React.FC<Props> = ({ title, children }) => (
  <Toolbar 
    component="header"
    sx={{ 
      bgcolor: 'primary.main', 
      color: 'black',
      justifyContent: 'space-between',
      padding: '0 !important'
    }}
  >
    <Container sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Typography variant="h6" component="h1">
        {title}
      </Typography>
      {children}
    </Container>
  </Toolbar> 
)
