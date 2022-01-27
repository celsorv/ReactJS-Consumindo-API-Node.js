function List(props) {

    function handleClick() {
        props.exclusao(props.id);
    }

    return (
        <div className="sugestao">
            <h1>  email: {props.titulo}</h1>
            <p>{props.mensagem}</p>
            <button onClick={handleClick}>X</button>
        </div>
    );

}

export default List;
