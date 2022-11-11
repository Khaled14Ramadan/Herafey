
export const compare=(a,b)=>{

    if(a.displayName>b.displayName){
      return -1
    }
    if(a.displayName<b.displayName){
      return 1
    }
    return 0
  }
  export const comparedesc=(a,b)=>{

    if(a.displayName>b.displayName){
      return 1
    }
    if(a.displayName<b.displayName){
      return -1
    }
    return 0
  }