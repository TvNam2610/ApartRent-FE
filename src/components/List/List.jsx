import './List.scss';
import Card from '../Card/Card.jsx';
import { listData } from '../../lib/dummyData.js';

function List() {
    return (
        <div className="list">
            {listData.map((item) => (
                <Card key={item.id} property={item} />
            ))}
        </div>
    );
}

export default List;
