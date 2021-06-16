async function searchUsers(event) {
    event.preventDefault();
    const query = document.getElementById('searchBar').value;

    fetch(`/api/users/searchUser/${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.length >= 1) {
                document.getElementById('searchResults').innerHTML = ''
                document.getElementById('searchResults').style.display = "flex"
                for (let i = 0; i < data.length; i++) {
                    var img = ''
                    var userDesc = ''
                    if (data[i].profile_pic !== null) {
                        img = `<img src="${data[i].profile_pic}" class="card-img-top" alt="${data[i].fullname}'s profile picture">`
                    }
                    if (data[i].description !== null) {
                        userDesc = data[i].description
                    }
                    document.getElementById('searchResults').innerHTML += `
                <li>
                <div class="card" style="width: 500px;; margin-top:10px">
                  ${img}
                  <div class="card-body">
                      <h1>${data[i].fullname}</h1>
                    <p class="card-text">${userDesc}</p>
                  </div>
                </div>
              </li>`
                }
            } else {
                document.getElementById('searchResults').style.display = "none"
            }
        })
}

document.getElementById('searchButton').addEventListener('click', searchUsers);
document.getElementById('searchForm').addEventListener('submit', searchUsers);