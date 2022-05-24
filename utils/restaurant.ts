export async function getCurrentPosition() 
    {
      return new Promise( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          position => resolve(position.coords),
          error => reject(error)
        )
      })
    }