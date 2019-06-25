// https://tedshd.io/api/test/meta.php?meta=home

// export default function (page) {
//   const promise = new Promise(function (resolve, reject) {
//     const url = 'https://tedshd.io/api/test/meta.php?meta=' + page
//     const handler = function () {
//       if (this.readyState !== 4) {
//         return
//       }
//       if (this.status === 200) {
//         console.log('META API', this.response)
//         resolve(this.response)
//       } else {
//         reject(new Error(this.statusText))
//       }
//     }
//     const client = new XMLHttpRequest()
//     client.open('GET', url)
//     client.onreadystatechange = handler
//     client.responseType = 'json'
//     client.setRequestHeader('Accept', 'application/json')
//     client.send()
//   })

//   return promise
// }

import axios from 'axios'

export default function (page) {
  return axios.get('https://tedshd.io/api/test/meta.php', {
    params: {
      meta: page
    }
  })
  .then(function (response) {
    // console.log(response)
    return response.data
  })
  .catch(function (error) {
    // console.log(error)
    return error
  });
}