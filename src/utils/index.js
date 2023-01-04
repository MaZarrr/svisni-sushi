export function hasEntries(object) {
    if (!object) return false;
  
    return Object.entries(object).length > 0;
  }

export const sendRequest = async () => {
    try {
      const res = await fetch(`https://svisniplatform.site/getWall`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify( {
            count: 8
          })
      })
      
      if (!res.ok) {
        throw new Error(`Response failed`)
      }
      return await res.json();
    } catch (error) {
      return {
        status: 500,
        headers: {},
        props: {}
      }
    }
  }