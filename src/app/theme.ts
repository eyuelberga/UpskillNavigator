import { extendTheme } from '@chakra-ui/react'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

const theme = extendTheme({
  components: {
   Link:{
    baseStyle:{
        color:"orange.500"
    }
   },
      // 6. We can overwrite defaultProps
      defaultProps: {
        size: 'lg', // default is md
        variant: 'sm', // default is solid
        colorScheme: 'orange', // default is gray
      },
    },
})

export default theme