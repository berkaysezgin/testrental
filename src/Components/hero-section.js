import { Container, makeStyles} from "@material-ui/core";
// import './banner.css';
const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./LandingImage.png)",
    backgroundRepeat:"repeat-x",
    position:"relative",
  },
  bannerContent: {
    height: 300,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
}));

function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <div className='Image'>
      <Container className={classes.bannerContent}>
                    
      </Container>
      </div>
    </div>
  );
}

export default Banner;
