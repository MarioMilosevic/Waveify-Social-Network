import { ButtonWrapperProps } from "../../../utils/types"
const ButtonWrapper = ({children}:ButtonWrapperProps) => {
  return (
    <div style={{display:"flex", gap:"1rem", padding:"1.6rem 0rem"}}>
      {children}
    </div>
  )
}

export default ButtonWrapper
