const Footer = () => {
  return (
    <div className="bg-dark text-light">
      <div className="container">
        <div className="row py-5 gy-4">
          <div className="col-12 col-md-12 col-lg-3">
            <h4 className="mb-3">Lorem Ipsum</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo neque veritatis tempora! Laborum facere.</p>
          </div>
          <div className="col-12 col-md-2 col-lg-2">
            <h4 className="mb-3">Discover</h4>
            <h6>Shop</h6>
            <h6>Support</h6>
            <h6>Terms</h6>
            <h6>Privacy</h6>
          </div>
          <div className="col-12 col-md-2 col-lg-2">
            <h4 className="mb-3">About</h4>
            <h6>Team</h6>
            <h6>Blog</h6>
            <h6>Reviews</h6>
            <h6>Career</h6>
          </div>
          <div className="col-12 col-md-2 col-lg-2">
            <h4 className="mb-3">Social</h4>
            <h6><i className="bi bi-facebook"></i> Facebook</h6>
            <h6><i className="bi bi-twitter"></i> Twitter</h6>
            <h6><i className="bi bi-instagram"></i> Instagram</h6>
            <h6><i className="bi bi-pinterest"></i> Pinterest</h6>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <h4 className="mb-3">Contact</h4>
            <h6><i className="bi bi-telephone"></i> aaa-aaa-aaaa</h6>
            <h6><i className="bi bi-telephone"></i> bbb-bbb-bbbb</h6>
            <h6 className="text-nowrap"><i className="bi bi-envelope"></i> support@example.com</h6>
            <h6><i className="bi bi-geo-alt"></i> Street One, City One, State One</h6>
          </div>
        </div>
      </div>
      <div className="container border-top border-secondary py-5">
        <p className="text-center">Copyright &copy;2025 Example.com. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;