import {useContext} from 'react'
import { KeyContext } from '../components/KeyDownProvider'


export const useKeys= () => useContext(KeyContext)
