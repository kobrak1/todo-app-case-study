const searchQuery = 'important task';

Todo.find({ $text: { $search: searchQuery } })
    .exec()
    .then(todos => {
        console.log('Matching todos:', todos);
        // Handle your results here
    })
    .catch(err => {
        console.error('Error searching todos:', err);
        // Handle errors
    });
