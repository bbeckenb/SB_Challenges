$form = $('#add-cupcake-form')
$cupcakeList = $('#cupcake-list')
$formButton = $('#form-btn')

$cupcakeList.on('click', '.delete-cupcake', deleteCupcake)


async function deleteCupcake() {
  const id = $(this).data('id');
  await axios.delete(`/api/cupcakes/${id}`);
  $(this).parent().remove();
}

async function addCupcake(evt) {
    evt.preventDefault();

    const flavor = $('#flavor').val();
    const size = $('#size').val();
    const rating = $('#rating').val();
    const image = $('#image').val();
    
    const res = await axios({
        url: 'http://127.0.0.1:5000/api/cupcakes',
        method: 'POST',
        data: {
            flavor: flavor,
            size: size,
            rating: rating,
            image: image
        }
    })

    let $newCupcake = $(`<li><button class="btn delete-cupcake btn-md btn-danger" data-id="${res.data.cupcake.id}">X</button> 
    FLAVOR: ${res.data.cupcake.flavor} SIZE: ${res.data.cupcake.size}</li>`)
    $cupcakeList.append($newCupcake)
}


$formButton.on("click", addCupcake);