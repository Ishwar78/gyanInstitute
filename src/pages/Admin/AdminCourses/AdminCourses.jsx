import { FiEdit3, FiPlus, FiTrash2 } from "react-icons/fi";
import "./AdminCourses.css";
const courses = [
  ["Full Stack Web Development","Computer Courses","6 Months","Active"],
  ["UPSC Civil Services Preparation","Competitive Exams","12 Months","Active"],
  ["Tally Prime with GST","Professional Courses","2 Months","Active"],
  ["Spoken English & Communication","Language Courses","3 Months","Active"],
  ["Advanced Excel & Power BI","Computer Courses","3 Months","Active"]
];
export default function AdminCourses(){
 return <div className="admin-page course-admin"><div className="admin-page-head"><div><span className="eyebrow">CONTENT MANAGEMENT</span><h1>Courses</h1><p>Add, update and organize courses shown on the public website.</p></div><button><FiPlus/> Add Course</button></div>
 <div className="admin-toolbar"><input placeholder="Search courses..." /><select><option>All Categories</option><option>Computer Courses</option><option>Competitive Exams</option></select></div>
 <div className="admin-table-wrap"><table><thead><tr><th>Course</th><th>Category</th><th>Duration</th><th>Status</th><th>Actions</th></tr></thead><tbody>{courses.map(c=><tr key={c[0]}><td><b>{c[0]}</b></td><td>{c[1]}</td><td>{c[2]}</td><td><span className="status">{c[3]}</span></td><td><div className="actions"><button><FiEdit3/></button><button><FiTrash2/></button></div></td></tr>)}</tbody></table></div></div>
}
