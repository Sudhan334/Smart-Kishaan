

import { NavLink } from "react-router-dom";
import HomePageBanner from "../../component/home/banner/banner.component";

const HomePage = () => {
  return (
    <>
      <HomePageBanner />

      <div className="container px-4 py-5" style={{ marginTop: "11rem" }} id="hanging-icons">
        <div className="container">
          <div className="row g-4 py-5">
            {[
              {
                title: "Farmers Market",
                description:
                  "Want to buy fresh farm products directly from the farm? We have live farmers selling their products on our website. Order now for healthy products delivered to your doorstep.",
                icon: "fa-store",
                link: "/farmer-market",
                buttonLabel: "Buy Now",
              },
              {
                title: "Crop Recommendation",
                description:
                  "Are you a farmer? Do you want to know the best crop for your soil? We've got you covered. Click the link below.",
                icon: "fa-leaf",
                link: "/crop-recommendation",
                buttonLabel: "Crop",
              },
              {
                title: "Crop Cure",
                description:
                  "Do you think your soil lacks some nutrients? Find out which ones and boost productivity. Click the link below.",
                icon: "fa-hand-holding-droplet",
                link: "/crop-cure",
                buttonLabel: "Cure",
              },
              {
                title: "Sell Your Products",
                description:
                  "Want to sell your farm products? Register as a farmer now and get lots of features for free from our app.",
                icon: "fa-shop",
                link: "/register",
                buttonLabel: "Sign Up",
              },
            ].map((service, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
                <div className="card shadow-sm bg-white border-0 rounded-3 p-4 w-100 h-100 transition-transform hover-lift">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-square bg-success text-white rounded-circle d-flex align-items-center justify-content-center fs-3 me-3 p-3" style={{ backgroundColor: "#60bb45" }}>
                      <i className={`fa-solid ${service.icon}`}></i>
                    </div>
                    <h4 className="mb-0">{service.title}</h4>
                  </div>
                  <p className="text-muted">{service.description}</p>
                  <NavLink to={service.link} className="btn btn-gradient-green w-100">
                    {service.buttonLabel}
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .btn-gradient-green {
          background:  #498640;
          {/* background:#ff5945; */}
          border: none;
          color: #fff;
          transition: background 0.3s ease;
        }
        .btn-gradient-green:hover {
          background:  #498640;
          {/* background:red; */}

        }
        .hover-lift:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }
        .icon-square {
          width: 50px;
          height: 50px;
        }
      `}</style>
    </>
  );
};

export default HomePage;