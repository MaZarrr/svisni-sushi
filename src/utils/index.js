export function hasEntries(object) {
    if (!object) return false;
  
    return Object.entries(object).length > 0;
  }

export function getFormattedDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDate;
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