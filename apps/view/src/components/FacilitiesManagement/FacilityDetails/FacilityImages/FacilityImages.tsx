import { ImageList, ImageListItem, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ReactElement, useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  imageList: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
  },
}));

function FacilityImages(): ReactElement {
  const styles = useStyles();
  const [imgs, setImgs] = useState(itemData);

  return (
    <ImageList className={styles.imageList} cols={1}>
      {imgs.map((item) => (
        <ImageListItem
          key={item.img}
          sx={{ width: '100%', height: 'fit-content' }}
        >
          <img src={`${item.img}`} alt={item.title} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default FacilityImages;

//This is mock data, for testing UI
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
];
