import React from 'react'
class Command extends React.Component {
    render() {
        const { commands } = this.props;
        return (
            <ul className="comment-list">
                {commands.map(item=>(
                    <li className="comment">
                        <div className="vcard">
                            <img src="images/drink-12.jpg" alt="Image placeholder" />
                        </div>
                        <div className="comment-body">
                            <h3>{item.name}</h3>
                            <div className="meta">{item.date}</div>
                            <p>{item.command}</p>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }
}
export default Command