import { CSSProperties, Stack as Flex } from '@mui/material'

import Link from 'next/link'

type CategoryBarPropsType = {
  children?: React.ReactNode
}

const CategoryList: string[] = [
  ' טבע ונופים ',
  ' חניות מובילות  ',
  'שטחים ציבוריים',
  '',
]



export default function MainCategoryBar(props: CategoryBarPropsType) {

  const {} = props

  const LinkStyle: CSSProperties = {
    textDecoration: "none",
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    fontSize:'1em',
    textAlign:'center',
    padding:1
  }


  
  return <Flex
    direction={"row"}
    justifyContent={'center'}
    m={2}
  >
    {CategoryList.map((item, index) => (
      <Link
         href={'/'}
         key={index}
        style={LinkStyle}
        onClick={(e:React.SyntheticEvent) => {
          e.preventDefault()
          
        }}
      >
        {item}
      </Link>
    ))}
  </Flex>
}