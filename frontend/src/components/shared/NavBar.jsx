import { Link } from "react-router-dom";
import AuthContextModule from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope, faCog } from "@fortawesome/free-solid-svg-icons";
import ButtonLink from "../buttons/ButtonLink";

const NavBar = () => {
  const { user, logout } = AuthContextModule.useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="navbar">
      <div>
        <Link to="/">
          <svg
            width="116"
            height="44"
            viewBox="0 0 116 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_11_11)">
              <path
                d="M115.079 13.459H106.145V43.5011H115.079V13.459Z"
                fill="#7715FF"
              />
              <path
                d="M21.0973 20.0787C20.8649 20.4492 20.6245 20.7069 20.3601 20.8599C20.1037 21.013 19.7672 21.0935 19.3665 21.0935C18.9659 21.0935 18.5172 21.0049 18.1005 20.8197C17.6758 20.6344 17.2191 20.4411 16.7303 20.2236C16.2416 20.0142 15.6887 19.8129 15.0717 19.6276C14.4547 19.4424 13.7576 19.3538 12.9644 19.3538C11.8266 19.3538 10.9612 19.5713 10.3522 20.0062C9.74325 20.4411 9.44678 21.0452 9.44678 21.8184C9.44678 22.3822 9.6471 22.8413 10.0397 23.2117C10.4323 23.5822 10.9532 23.9044 11.6102 24.1782C12.2592 24.4601 13.0044 24.7259 13.8297 24.9756C14.655 25.2253 15.5044 25.5072 16.3698 25.8132C17.2351 26.1193 18.0765 26.4817 18.9098 26.9006C19.7351 27.3194 20.4723 27.8268 21.1293 28.4389C21.7783 29.051 22.3072 29.784 22.6998 30.6538C23.0924 31.5237 23.2927 32.5627 23.2927 33.7788C23.2927 35.2689 23.0203 36.6381 22.4835 37.8945C21.9466 39.151 21.1453 40.2302 20.0796 41.1404C19.014 42.0505 17.6999 42.7512 16.1294 43.2586C14.5669 43.758 12.764 44.0157 10.7288 44.0157C9.7112 44.0157 8.69359 43.9191 7.67598 43.7257C6.65836 43.5324 5.6728 43.2747 4.71929 42.9445C3.76577 42.6143 2.89239 42.2277 2.0831 41.7686C1.27382 41.3175 0.584728 40.8262 0.0078125 40.3027L2.0831 37.0005C2.31547 36.6139 2.60393 36.3078 2.9645 36.0904C3.31706 35.8649 3.77379 35.7602 4.33468 35.7602C4.8555 35.7602 5.32024 35.8729 5.72889 36.1065C6.14555 36.3401 6.58625 36.5897 7.06701 36.8636C7.54777 37.1374 8.10866 37.3871 8.74968 37.6207C9.3907 37.8542 10.208 37.967 11.1855 37.967C11.8746 37.967 12.4596 37.8945 12.9403 37.7495C13.4211 37.6046 13.8057 37.4032 14.0942 37.1535C14.3826 36.9039 14.5909 36.622 14.7272 36.3159C14.8634 36.0098 14.9275 35.6877 14.9275 35.3575C14.9275 34.7614 14.7272 34.2701 14.3185 33.8835C13.9099 33.4969 13.389 33.1667 12.732 32.8848C12.075 32.6029 11.3378 32.3452 10.4964 32.1036C9.66313 31.8619 8.81378 31.5881 7.94841 31.274C7.08303 30.9679 6.23369 30.5974 5.40037 30.1625C4.56704 29.7276 3.82186 29.1799 3.16482 28.5114C2.50778 27.8429 1.98695 27.0294 1.5783 26.0629C1.16966 25.0964 0.969338 23.9286 0.969338 22.5594C0.969338 21.2868 1.21773 20.0706 1.70651 18.9269C2.19528 17.7752 2.93245 16.7684 3.91 15.8985C4.88755 15.0287 6.12151 14.336 7.59585 13.8286C9.0782 13.3132 10.8009 13.0635 12.7801 13.0635C13.8538 13.0635 14.8954 13.1601 15.905 13.3534C16.9146 13.5467 17.8601 13.8206 18.7415 14.1669C19.6229 14.5132 20.4322 14.924 21.1614 15.3992C21.8905 15.8744 22.5315 16.3899 23.0924 16.9456L21.0732 20.1028L21.0973 20.0787Z"
                fill="#333333"
              />
              <path
                d="M33.9736 30.131C34.2621 32.6439 35.0233 34.4642 36.2492 35.5917C37.4752 36.7193 39.0617 37.2831 41.0008 37.2831C42.0344 37.2831 42.9318 37.1543 43.677 36.9046C44.4302 36.6549 45.0953 36.373 45.6802 36.0669C46.2651 35.7609 46.802 35.479 47.2908 35.2293C47.7795 34.9796 48.2923 34.8508 48.8292 34.8508C49.5423 34.8508 50.0792 35.1085 50.4398 35.632L53.0359 38.8456C52.1144 39.9088 51.1208 40.7706 50.0551 41.4391C48.9895 42.1076 47.8917 42.623 46.7699 43.0016C45.6482 43.3801 44.5184 43.6379 43.3966 43.7829C42.2748 43.9278 41.2011 44.0003 40.1835 44.0003C38.0922 44.0003 36.121 43.654 34.2861 42.9694C32.4512 42.2848 30.8487 41.2619 29.4705 39.9168C28.1003 38.5637 27.0106 36.8885 26.2173 34.8749C25.4161 32.8694 25.0234 30.5257 25.0234 27.8678C25.0234 25.8623 25.368 23.9535 26.0491 22.1574C26.7301 20.3613 27.7077 18.7907 28.9897 17.4376C30.2638 16.0845 31.8102 15.0133 33.6291 14.224C35.448 13.4347 37.4992 13.04 39.7829 13.04C41.762 13.04 43.5729 13.3461 45.2155 13.9663C46.8581 14.5864 48.2683 15.4805 49.4542 16.6644C50.6401 17.8484 51.5615 19.282 52.2186 20.9976C52.8756 22.7131 53.2122 24.6461 53.2122 26.8046C53.2122 27.4812 53.1801 28.0289 53.124 28.4557C53.0679 28.8826 52.9638 29.2209 52.8035 29.4706C52.6513 29.7203 52.4429 29.8974 52.1865 29.9941C51.9301 30.0907 51.5936 30.1391 51.1929 30.1391H33.9576L33.9736 30.131ZM45.2155 24.9119C45.2155 24.1951 45.1273 23.5024 44.943 22.8259C44.7587 22.1493 44.4623 21.5453 44.0536 21.0137C43.637 20.4821 43.1001 20.0552 42.427 19.725C41.754 19.3948 40.9367 19.2337 39.9752 19.2337C38.2845 19.2337 36.9624 19.725 36.0009 20.6996C35.0393 21.6741 34.4063 23.0836 34.1018 24.9119H45.2235H45.2155Z"
                fill="#333333"
              />
              <path
                d="M116 5.27525C116 5.99207 115.855 6.66057 115.567 7.28879C115.278 7.91702 114.886 8.4647 114.389 8.9399C113.892 9.4151 113.307 9.79364 112.642 10.0675C111.977 10.3494 111.272 10.4863 110.527 10.4863C109.782 10.4863 109.117 10.3494 108.484 10.0675C107.851 9.78559 107.29 9.4151 106.801 8.9399C106.312 8.4647 105.928 7.91702 105.647 7.28879C105.367 6.66057 105.23 5.99207 105.23 5.27525C105.23 4.55843 105.367 3.85771 105.647 3.22143C105.928 2.58515 106.312 2.02136 106.801 1.53811C107.29 1.05486 107.851 0.67631 108.484 0.410522C109.117 0.136679 109.798 0.0078125 110.527 0.0078125C111.256 0.0078125 111.985 0.144734 112.642 0.410522C113.307 0.684364 113.884 1.05486 114.389 1.53811C114.886 2.02136 115.278 2.58515 115.567 3.22143C115.855 3.85771 116 4.54232 116 5.27525Z"
                fill="#ED1108"
              />
              <path
                d="M72.8034 13.4983C72.3787 13.4097 65.6481 12.6365 63.7491 18.1295L63.2843 15.6085C63.2042 15.2219 63.1161 14.8917 63.0119 14.6259C62.9077 14.3521 62.7555 14.1346 62.5471 13.9735C62.3468 13.8124 62.0984 13.6916 61.794 13.6111C61.4975 13.5305 61.1289 13.4983 60.6882 13.4983H55.3838V43.5404H64.318C64.318 43.5404 64.1978 31.1209 64.2619 26.7233C64.2859 25.3944 64.6946 24.0815 65.5519 23.0667C68.9974 18.9752 76.2008 22.4868 76.2649 22.4787L72.8034 13.4903V13.4983Z"
                fill="#333333"
              />
              <path
                d="M91.6977 34.8748L88.8772 24.9037L85.8484 15.0615C85.6962 14.6186 85.3997 14.2481 84.967 13.9501C84.5344 13.6521 84.0055 13.499 83.3645 13.499H75.9287L87.5151 43.5411H94.1416L91.6977 34.8829V34.8748Z"
                fill="#333333"
              />
              <path
                d="M89.9907 34.8748L92.8112 24.9037L95.84 15.0615C95.9923 14.6186 96.2887 14.2481 96.7214 13.9501C97.1541 13.6521 97.6829 13.499 98.324 13.499H105.76L94.1734 43.5411H87.5469L89.9907 34.8829V34.8748Z"
                fill="#7715FF"
              />
            </g>
            <defs>
              <clipPath id="clip0_11_11">
                <rect width="116" height="44" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </div>
      <ul className="navbar-elements">
        {!user ? (
          <>
            <li>
              <Link to="/como-funciona">Cómo Funciona</Link>
            </li>
            <li>
              <Link to="/login">Conéctate</Link>
            </li>
            <li>
              <Link to="/register">Regístrate</Link>
            </li>
            <li>
              <ButtonLink to="/post-service" className="btn-primary">
                Pide un Servicio
              </ButtonLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/dashboard">¡ Hola ! {user.nombre}</Link>
            </li>
            <li>
              <Link onClick={handleLogout}>Cerrar Sesión</Link>
            </li>
            <li>
              <Link>
                <FontAwesomeIcon icon={faBell} />
              </Link>
            </li>
            <li>
              <Link>
                <FontAwesomeIcon icon={faEnvelope} />
              </Link>
            </li>
            <li>
              <Link>
                <FontAwesomeIcon icon={faCog} />
              </Link>
            </li>
            <li>
              <ButtonLink to="/post-service" className="btn-primary">
                Pide un Servicio
              </ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
