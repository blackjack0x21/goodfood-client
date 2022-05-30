export async function getCurrentPosition(): Promise<GeolocationCoordinates> {
  return new Promise( (resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position.coords),
      error => reject(error)
    )
  })
}