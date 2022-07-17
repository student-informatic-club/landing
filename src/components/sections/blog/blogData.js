export const blogData = [
  {
    id: "1",
    title: "Những Hook hay dùng trong React",
    overview: "Tổng hợp những hook hay dùng trong React",
    createdAt: "2022-07-16T00:0:00.261+00:00",
    updatedAt: "2022-07-16T00:0:00.261+00:00",
    author: "Nguyen Van A",
    image: "id1.jpg",
    content: `
      <h4>Sơ lược về React Hooks</h4>
React Hooks chính thức được thêm vào ReactJS ở phiên bản 16.8 (tháng 2 năm 2019). Vậy trước khi có Hooks thì viết React như thế nào? 🤔

    Class components (Stateful components): là những component được viết bằng class, chúng được cung cấp rất nhiều các tính năng như State, Lifecycle, refs, …
    Functional components (Stateless components): là những component được viết như một function của JS, chỉ nhận vào dữ liệu thông qua props và render nó ra. Chúng không có State, Lifecycle và cũng không hỗ trợ refs.

React Hooks ra đời với nhiệm vụ hỗ trợ chúng ta viết một functional component có đầy đủ các tính năng như một class component thông qua các hooks (hook là lưỡi câu, hiểu đơn giản nó như một hàm kéo dữ liệu, thứ ta cần về cho chúng ta).

<h4>Vì sao nên dùng React Hooks ?</h4>
    + Viết component ngắn gọn và dễ hiểu hơn rất nhiều so với dùng class.
    + Đầy đủ tính năng như class component.
    + Hưởng được các lợi ích của functional component như dễ test một hàm (nhận đầu vào và trả ra kết quả).
    + Loại bỏ được từ khoá “this” thường gây nhầm lẫn khi dùng class.
    + Không cần phải viết lại các class component cũ. Các component mới nên viết với hooks.
    + React Hooks chỉ được sử dụng trong functional component.
    + Dễ dàng custom các hooks như ý muốn theo từng nghiệp vụ khác nhau.

<h5>1. useState</h5>
useState cho phép chúng ta khai báo một state trong functional component với cú pháp như sau:
    const [state, setState] = useState(initialValue);
    // Hoặc
    const [state, setState] = useState(()=> {
    // do something ...
    return initialValue;
})

    state chính là biến chứa local state, giống như state bên class.
    setState là một hàm dùng để update lại cái state này, nó tương tự this.setState() bên class.
    initialValue là giá trị khởi tạo đầu tiên của state. Chúng ta cũng có thể truyền vào một callback function để tính toán dữ liệu và trả về initValue.
<h5>Một vài lưu ý:</h5>
    + state thay đổi thì component sẽ re-render.
    + setState không hoạt động một cách đồng bộ, nhằm tăng performance cho hệ thống, tránh re-render không cần thiết. Để fix trường hợp này chúng ta có thể truyền vào một callback fn cho setState để lấy giá trị cũ.
    + callback function truyền vào useState chỉ được chạy duy nhất là đầu tiên.
    + Bạn có thể dùng nhiều state trong cùng một component nếu các state có ngữ nghĩa khác nhau.
<h5>2. useRef</h5>
useRef dùng để lưu trữ các giá trị trong suốt vòng đời của một component. Nó thường được dùng để truy cập các thành phần trong DOM với thuộc tính ref. Cú pháp khai báo như sau:
    // khai báo
    const ref = useRef(initialValue);
    // truy cập dữ liệu
    ref.current
    // thay đổi dữ liệu
    ref.current = newValue;
<h5>Một vài điểm hay ho của useRef:</h5>
    Bạn có thể truy cập và thay đổi giá trị trực tiếp của biến thông qua thuộc tính current của nó.
    useRef sẽ không làm component bị re-render mỗi lần current thay đổi. Điều này rất hữu dụng cho việc tăng performance hệ thống.
    Một vài ứng dụng thường dùng của useRef như ref đến ô input để auto focus, lấy kích thước của một element, lưu trữ giá trị input để validation, …
<h5>3. useEffect</h5>
Khái niệm Side Effects: là những thao tác, event bên ngoài component của chúng ta như việc thao tác với DOM, call APIs, setTimeout, setInterval, …
Clean up dùng để huỷ các đăng ký, các hàm đang được thực thi trong side effects. Có 2 loại sau:
    Cần clean up (vì những hàm này vẫn sẽ tiếp tục chạy sau khi component đã bị unmount, dẫn đến dữ liệu không có chỗ để render ra gây ra tình trạng memory leak): setTimeout, setInterval, subscriptions.
    Không cần clean up (Vì những hàm này sau khi run sẽ tự động huỷ đi): thao tác với DOM, call API.
useEffect cho phép chúng ta dễ dàng thao tác với các Side Effect này bên trong functional component. Đây có thể là một cách thay thế hiệu quả cho việc sử dụng lifecycle trong class component. Cú pháp chung như sau:
    useEffect(callback, [dependencies]);
    // Ví dụ đầy đủ
    useEffect(()=>{
    // do side effect ...
    return () => {
    // clean up
  }
}, [dependencies])
<h5>Một vài lưu ý:</h5>
    useEffect lưu chạy trong lần đầu tiên sau khi đã render (hay component đã mount).
    Nếu mảng dependencies = [] thì useEffect chỉ chạy một lần duy nhất.
    Nếu không truyền vào mảng dependencies (không truyền chứ không phải là [] nhé), thì useEffect luôn chạy lại sau mỗi lần render.
    Nếu bất kỳ phần tử nào trong mảng dependencies thay đổi thì useEffect sẽ được chạy lại.
    Hàm clean up chạy trước mỗi lẫn useEffect được chạy lại và sau khi component unmount. Và nhớ clean up đối với các case cần clean up ở trên để tránh memory leak.
    useEffect như một sự kết hợp hoàn hảo của componentDidMount, componentDidUpdate, componentWillUnmount.
    Bạn có thể dùng nhiều useEffect trong cùng một component. Và nên tách ra các useEffect xử lý các Side Effect khác nhau.
    Có một case là khi bạn call API để lấy dữ liệu về render lại component, nhưng trước khi dữ liệu được lấy về thì component đã bị unmount (có thể do người dùng chuyển trang), việc này dẫn đến tình trạng memory leak. Một tip khắc phục như sau:
useEffect(()=>{
  let isSubscribe = true; // cờ báo hiệu component còn mount hay không?
  (async function callAPI(){
    const data = await getData();
    if(isSubscribe && data){
       // chỉ re-render khi component chưa unmount
       reRender(data);
    }
  })();
  return () => {
    isSubscribe = false; // tắt cờ này nếu component bị unmount hoặc re-render;
  }
}, [dependencies])
<h5>4. useMemo</h5>
useMemo sử dụng kỹ thuật Memoization Caching giúp tối ưu hoá tốc độ và tiết kiệm bộ nhớ bằng việc ghi nhớ các kết quả đã được tính toán nếu cùng một đầu vào.
const memoizedValue = useMemo(() => {
  // chạy một hàm tính toán phức tạp nào đó
  return value;
}), [dependencies]);
<h5>Một số lưu ý:</h5>
    Hàm tính toán phức tạp đó sẽ chạy lại mỗi lần dependencies thay đổi.
    useMemo chạy trong lúc rendering nên tránh sử dụng xử lý các Side Effects (hãy dùng useEffect cho TH này).
    ĐỪNG dùng useMemo mà KHÔNG truyền vào dependencies nào vì đơn giản nó không còn ý nghĩa gì 😅
    Tránh lạm dụng useMemo cho các tính toán không quá phức tạp, vì sẽ lãng phí bộ nhớ cho việc caching.
<h5>5. useCallback</h5>
useCallback tương tự như useMemo nhưng nó dùng để ghi nhớ một hàm callback. Nó rất hữu dụng khi chúng ta truyền hàm này làm props cho một component nào đó render rất nặng. Vì đôi khi function chúng ta không hề thay đổi sau mỗi lần render nhưng vì function là giá trị tham chiếu nên nó luôn bị thay đổi dẫn đến component con bị re-render không cần thiết. useCallback sẽ giúp chúng ta khắc phục điều này.
const memoizedCallback = useCallback(
  () => {
    // do something...
  },
  [dependencies],
);
// Có thể sử dụng useMemo như useCallback nếu useMemo trả về 1 function
useCallback(fn, deps) = useMemo(() => fn, deps).
<h5>6. useContext và useReducer</h5>
useContext giúp chúng ta sử dụng các biến context (global state) được tạo ra bởi React.createContext. Nó giúp việc sử dụng, chia sẻ các state giữa các component trở nên dễ dàng hơn. Cú pháp như sau:
const value = useContext(MyContext);

useReducer giúp chúng ta tạo nên một kho lưu trữ các state và thay đổi state đó thông qua hàm dispatch một action và dựa theo loại action truyền đến mà xử lý thích hợp, sau đó trả về một state mới. Nếu bạn đã làm việc với Redux thì concept nó tương tự như thế.
// reducer thường có dạng như vầy
const reducer = (state, action) => {
  const { type } = action;
  switch(type){
    case 'ABC':
      return newState;
    ...
  }
}
const [state, dispatch] = useReducer(reducer, initialArg, init);
<h5>Một vài lưu ý:</h5>
    useContext chỉ sử dụng trong những component là con của biến MyContext.Provider.
    useContext thích hợp cho việc quản lý các global state cho các ứng dụng nhỏ, không quá phức tạp.
    Một vài thư viện có thể thay thế cho 2 hook trên như Redux, React Recoil, MobX, …

<h5>Nguồn: internet</h5>
      `,
    tags: ['reactjs', 'useState', 'useEffect', 'useContext', 'useMemo', 'useRef', 'useReducer', 'front end'],
  },
];
