import {useState} from "react";
import {productsProps} from "../State";
import { Button, ListGroup, Form } from 'react-bootstrap';

interface ProductProps {
    product: productsProps
}

function Product({product}: ProductProps) {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }

    return (
        <ListGroup.Item key={product.productName}>
            <div className="d-flex justify-content-between">
                <Form.Check
                    type="checkbox"
                    label={
                        <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
                            {product.productName}
                        </span>
                    }
                    onChange={handleCheckboxChange}
                    checked={isChecked}
                />
                {product?.quantity && 
                    <Button disabled variant="outline-primary">{'Quantità: ' + product?.quantity}</Button>
                }
            </div>
        </ListGroup.Item>
    )
}

export default Product