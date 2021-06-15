

const delButtonHandler = async (event) => {
    console.log("delButtonHandler")
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comment/:${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);

/*
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);
  


document.getElementById('deletecomment').addEventListener('click', newFormHandler);

*/