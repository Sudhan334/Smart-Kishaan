import { NavLink } from "react-router-dom";
import HomePageBanner from "../../component/home/banner/banner.component";

const HomePage = () => {
  return (
    <>
      <HomePageBanner />

      <div className="container px-4 py-5" style={{ marginTop: "11rem" }} id="hanging-icons">
        {/* <h2 className="pb-2 border-bottom text-white">Our Services</h2> */}
       
        <div className="container">
          <div className="row g-3 py-5">
            <div className="col-12 col-md-6 col-lg-4 d-flex align-items-start">
              <div className="card bg-white px-3 py-4 rounded-2 w-100">
                <div>
                  <h3 className="text-body-emphasis">
                    {" "}
                    <div className="icon-square rounded p-2 text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                      <i className="fa-solid fa-store"></i>
                    </div>
                    Farmers Market
                  </h3>
                  <p>
                    Want to buy fresh farm products directly from the farm? We
                    have got live farmers selling their products on our website.
                    Order now for healthy products right to your doorstep.
                  </p>
                  <NavLink to="/farmer-market" className="btn btn-success">
                    Buy Now
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 d-flex align-items-start">
              <div className="card bg-white px-3 py-4 rounded-2 w-100">
                <div>
                  <h3 className="text-body-emphasis">
                    {" "}
                    <div className="icon-square rounded p-2 text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                      <i className="fa-solid fa-leaf"></i>
                    </div>
                    Crop Recommendation
                  </h3>
                  <p>
                    Are you a farmer? Do you want to know the best crop for your
                    soil? We've got you covered. Click the link below.
                  </p>
                  <NavLink
                    to="/crop-recommendation"
                    className="btn btn-success"
                  >
                    Crop
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 d-flex align-items-start">
              <div className="card bg-white px-3 py-4 rounded-2 w-100">
                <div>
                  <h3 className="text-body-emphasis">
                    {" "}
                    <div className="icon-square rounded p-2 text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                      <i className="fa-solid fa-hand-holding-droplet"></i>
                    </div>
                    Crop Cure
                  </h3>
                  <p>
                    Do you think your soil lacks some nutrients? Find out which
                    ones and boost productivity. Click the link below.
                  </p>
                  <NavLink to="/crop-cure" className="btn btn-success">
                    Cure
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 d-flex align-items-start">
              <div className="card bg-white px-3 py-4 rounded-2 w-100">
                <div>
                  <h3 className="text-body-emphasis">
                    <div className="icon-square rounded p-2 text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                      <i className="fa-solid fa-shop"></i>
                    </div>
                    Sell your products
                  </h3>
                  <p>
                    Want to sell your farm products? Register as a farmer now
                    and get lots of features for free from our app.
                  </p>
                  <NavLink to="/register" className="btn btn-success">
                    Sign Up
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
