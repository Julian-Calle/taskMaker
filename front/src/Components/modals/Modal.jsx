import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import "../../css/modal.css"
import useMediaQuery from "@material-ui/core/useMediaQuery";
// width	
// height	
// measure	
// onClose	
// onAnimationEnd	
// visible	
// showMask	
// closeOnEsc
// closeMaskOnClick	
// showCloseButton	
// animation	
// enterAnimation	
// leaveAnimation	
// duration	
// className	
// customStyles	
// customMaskStyles
//#03a9f4

export default function Modal({active, title,body,closeAction, btnName, secBtnName,
  actBtn,actSecBtn, btnAction, secBtnAction, effect}) {
  
  const size400 = useMediaQuery("(min-width:400px)");
  const size500 = useMediaQuery("(min-width:500px)");

const modalSizeWidth =size500? "500px": size400?'400px':"300px";
const modalSizeHeight =size500? "500px": size400?'400px':"400px";
const bodyModalSizeWidth =size500? "450px": size400?'350px':"250px";
const bodyModalSizeHeight =size500? "370px": size400?'280px':"280px";
const modalEffect = effect??"zoom";
const handleFirstAction=()=>{
if(btnAction)btnAction();
}

const handleSecondAction=()=>{
  if(actSecBtn)secBtnAction();
}


    return (
<Rodal
      
      visible={active}
      onClose={closeAction}
      closeOnEsc={true}
      // width={400}
      // height={400}
      customStyles={{
        width: `${modalSizeWidth}`,
      height: `${modalSizeHeight}`
      }}
    
      animation={modalEffect}
    >
      <div className="modalContainer" >
      <header className="modalTitle" >{title}</header>
      <section className="modalBody"   style={{width:`${bodyModalSizeWidth}`, height:`${bodyModalSizeHeight}`}}>
      {body}
      </section>
      <section className="ModalButtons">

      { actBtn && <button onClick={handleFirstAction} className="firstBtn modalbtn">{btnName}</button>}
      { actSecBtn && <button onClick={handleSecondAction} className="secondBtn modalbtn">{secBtnName}</button>}
      </section>
      </div>
    </Rodal>
    )
}


