import React from 'react'
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class DragAndDropHOC extends React.Component {
    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
            </DndProvider>

        )
    }
};
// export default function MyTagControlContext(DecoratedClass) {
//     return (
//         <DndProvider backend={HTML5Backend}>
//             {DecoratedClass}
//         </DndProvider>
//     )
// }
export default DragAndDropHOC