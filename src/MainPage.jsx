import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Logo from "./assets/educ consultant logo.jpg";
import "./MainPage.css";

function MainPage() {
  const [unis, setUnis] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    // GET request using fetch inside useEffect React hook
    fetch("https://backend-lbud.onrender.com/api/unis", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUnis(data), setLoading(false);
      })
      .catch((err) => console.log(err));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  const getUni = (e) => {
    console.log(e.target.previousSibling.innerHTML);
    setLoading(true);
    fetch(
      `https://backend-lbud.onrender.com/api/uniSearch/${e.target.previousSibling.innerHTML}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUnis(data), setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const loaderContainer = useRef();
  const tableBody = useRef();
  useEffect(() => {
    console.log(loading);
    if (loading === true) {
      loaderContainer.current.style.display = "flex";
      tableBody.current.style.display = "none";
    } else {
      loaderContainer.current.style.display = "none";
      tableBody.current.style.display = "table-row-group";
    }
  }, [loading]);
  return (
    <>
      <nav className="navbar border-bottom border-secondary bg-body-secondary">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={Logo} width={50} height={50} alt="Logo" />
          </a>
          {/* <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={(e) => {
                getUni(e);
              }}
            >
              Search
            </button>
          </form> */}
        </div>
      </nav>
      <div>
        <table className="table table-striped table-hover" dir="rtl">
          <thead>
            <tr>
              <th>اسم الجامعة</th>
              <th>المدينة</th>
              <th>بداية التسجيل</th>
              <th>نهاية التسجيل</th>
              <th>الأقساط السنوية</th>
              <th>رابط</th>
            </tr>
          </thead>

          <tbody ref={tableBody}>
            {unis.map((uni) => (
              <tr key={uni.id}>
                <td>{uni.name}</td>
                <td>{uni.city}</td>
                <td>{uni.applyStart}</td>
                <td>{uni.applyEnd}</td>
                <td>
                  <a
                    href={uni.priceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    الاقساط السنوية
                  </a>
                </td>
                <td>
                  <a
                    href={uni.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    اضغط للتسجيل
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="loaderContainer" ref={loaderContainer}>
          <div class="loader">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
            <div class="bar4"></div>
            <div class="bar5"></div>
            <div class="bar6"></div>
            <div class="bar7"></div>
            <div class="bar8"></div>
            <div class="bar9"></div>
            <div class="bar10"></div>
            <div class="bar11"></div>
            <div class="bar12"></div>
          </div>
        </div>
        <footer
          id="sticky-footer"
          class="flex-shrink-0 py-4 bg-dark text-white-50"
        >
          <div class="container text-center d-flex justify-content-around">
            <small>Copyright &copy; 2024</small>
            <div className="d-flex gap-4">
              <a href="https://chat.whatsapp.com/DNR9hLmeBBg2xZNt2ObXw7">
                <FontAwesomeIcon icon={faWhatsapp} size="2xl" />
              </a>
              <a href="https://t.me/pioneering_educ">
                <FontAwesomeIcon icon={faTelegram} size="2xl" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainPage;
