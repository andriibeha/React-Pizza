import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const FullPizza = () => {
    const { id } = useParams();
    const [pizza, setPizza] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`https://6304b2f794b8c58fd7231db1.mockapi.io/api/items/${id}`)
                setPizza(data);
            } catch (error) {
                alert("Ошибка получения пиц");
                navigate("/");
            }
        }

        fetchPizza();
    }, [id, navigate]);

    if (!pizza) { 
        return "Loading"
    };

    return (
        <div className="container">
            <img src={pizza.imageUrl} alt="pizza" />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    )
};

export default FullPizza;