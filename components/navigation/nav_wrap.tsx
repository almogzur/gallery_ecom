import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useSession } from 'next-auth/react';
import width_context from '../../context/width_context';
import LoadingFallBack from '../loading-fallback';
import { signOut } from 'next-auth/react'
import Link from 'next/link';
import ImageUploader from '@/util/cloudinary/front/image-uploader';
import { useTheme } from '@mui/material';



type PageKeyType = {
  label: string,
  href: string,
}

const PagesLinks: PageKeyType[] = [
  { label: "בית", href: "/" },
  { label: "בלוג", href: "/blog" },
  { label: "אודות", href: "/about" },
]

const ProfileLinks: PageKeyType[] = [
  { label: "פרופיל", href: "/profile" },
  { label: 'פוסט חדש', href: "/blog/new-post" },
]


type ResponsiveAppBarPropsType = {
  children?: React.ReactNode
  App_Bars_Styles?: React.CSSProperties
  Toll_bar_Styles?: React.CSSProperties
}

function ResponsiveAppBar(props: ResponsiveAppBarPropsType) {

  const { data: session, status } = useSession()
  const { lg, xxs } = React.useContext(width_context)
  const theme = useTheme()

  const [pageLoaded, setPageLoaded] = React.useState(false)
  const [anchorElNav, setAnchorElNav] = React.useState<Element | undefined>(undefined);
  const [anchorElUser, setAnchorElUser] = React.useState<Element | undefined>(undefined);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(undefined);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(undefined);
  };

  const UserSettingsBox = Box,
    PagesBox = Box,
    BurgerManuBox = Box


  React.useEffect(() => {
    setPageLoaded(true)
  }, [pageLoaded, session])

  
 if (!pageLoaded || status === 'loading') {
    return <LoadingFallBack  CircularProgressProps={{
      sx:{
        color: theme.palette.common.black
      }
    }}/>
  }

  return (
    <AppBar
      sx={{ ...props.App_Bars_Styles }}
    >
      <Toolbar
        sx={{ ...props.Toll_bar_Styles }}
      >
        {xxs && !lg &&
          <BurgerManuBox
            display={'flex'}
          >
            <IconButton
              size='large'
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon fontSize='large' />

            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', lg: 'none' } }}
            >

              {PagesLinks.map((page) => 
                <MenuItem 
                  key={page.label}
                   onClick={handleCloseNavMenu}
  
                 
                 >
                  <Link 
                    href={page.href}
                    style={{textDecoration:'none',color:'black', fontWeight:'bold'}}
                    > {page.label}</Link>
                  
                </MenuItem>
              )}
            </Menu>

          </BurgerManuBox>
         }

        <PagesBox
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' }
          }}>
          {PagesLinks.map((page) => (
            <Button
              key={page.label}
              href={page.href}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page.label}
            </Button>
          ))}
        </PagesBox>


        { status === "authenticated" ?
            /**
             *  User info 
             */
            <UserSettingsBox 
            sx={{
              mr:'auto'
            }}
            >

              <Tooltip title={session?.user?.email}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem disableGutters sx={{display:'flex',justifyContent:'center'}} >
                  <ImageUploader/>
                </MenuItem>
                {ProfileLinks.map((setting) => (
                  
                    <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                      <Link
                        href={setting.href}
                        style={{
                          textDecoration: 'none', color: 'black',fontWeight:'bold'
                        }}
                      > {setting.label} </Link>
                    </MenuItem>

                  
                ))}
                <MenuItem
                  onClick={() => signOut()}
                >
                  <Typography fontWeight={'bold'} >התנתק</Typography>
                </MenuItem>

              </Menu>

            </UserSettingsBox>


            /**
             *  No Session
             */
            :
           <Button
              href='/auth/signin'
              sx={{
                  mr:'auto',
                  color:'#fff',
                  fontSize:'1.2em',
                  fontWeight:'bold'
                }}
            >התחברות
            </Button>
        }







      </Toolbar>

    </AppBar>
  );
}
export default ResponsiveAppBar;

//https://res.cloudinary.com/doyd6znyd/image/upload/c_limit,w_640/f_auto/q_auto/v1/samples/cloudinary-group?_a=BAVAZGE70