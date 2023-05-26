import React from 'react';
import { Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd";

interface IPlaceForVisitProps {
  id: string;
  items: {
    address: string;
    location_id: string;
    latitude: string;
    longitude: string;
    name: string;
    photo: {
      images: {
        medium: {
          url: string;
        }
      }
    }
    phone: string;
    rating: string;    
  }[];
}

const PlacesForVisit = ({items, id}: IPlaceForVisitProps ) => {

  return (
    <Droppable droppableId={id}>
      {(provided: DroppableProvided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <h2>Places</h2>
          {items && items.map((item: any, index: number) => {
            return (
              <Draggable draggableId={item.location_id} index={index} key={item.location_id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div>
                      <img src={item.photo.images.medium.url} alt={item.name} />
                      <div>{item.name}</div>
                      <div>{item.address}</div>
                      <div>{item.phone}</div>
                      <div>{item.rating}</div>
                    </div>
                  </div>
                )}
              </Draggable>
            )
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default PlacesForVisit