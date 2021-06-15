

const delButtonHandler = async (event) => {
    var id;
    if (event.target.hasAttribute('data-id')) {
      id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/comment:${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(`Failed to delete comment ${id}`);
      }
    }
  };

  document.querySelectorAll(".delbutton").forEach(btn => 
    btn.addEventListener("click", delButtonHandler)
  )
