import {useContext} from 'react'
import { KeyContext } from '../components/KeyDownProvider'


// TODO give this hook a proper name
export const useKeys= () => useContext(KeyContext)
