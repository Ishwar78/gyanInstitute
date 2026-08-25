import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiUser } from "react-icons/fi";
import "./BlogDetails.css";

const article = {
  "how-to-choose-right-career-course": {
    title: "How to Choose the Right Career Course After School",
    category: "Career Guidance",
    date: "August 18, 2026",
    author: "Gyan Institute Team",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=85",
    intro: "Choosing a course is not only about selecting a popular option. It is about understanding your strengths, interests, learning style and the kind of future you want to build.",
    sections: [
      ["Start With Your Interests", "Think about the subjects and activities that naturally hold your attention. Genuine interest makes it easier to stay consistent when the learning becomes challenging."],
      ["Look at the Skills You Will Build", "Read the curriculum carefully. A strong course should give you practical skills, guided practice and enough exposure to real-world tasks rather than only theoretical knowledge."],
      ["Check Faculty and Learning Support", "Experienced teachers can shorten the learning curve by giving clear explanations, feedback and direction. Ask about mentoring, doubt sessions and academic support before enrolling."],
      ["Think Beyond the Certificate", "A certificate can document learning, but your portfolio, communication skills, projects and confidence are equally important. Prefer learning environments that help you demonstrate what you can actually do."],
      ["Make a Simple Comparison", "Compare duration, syllabus, practical exposure, faculty, support, outcomes and fee structure. Then choose the option that matches your personal goals instead of simply following what everyone else is doing."]
    ]
  },
  "smart-study-habits-for-exams": {
    title: "7 Smart Study Habits That Improve Exam Preparation",
    category: "Study Tips",
    date: "August 12, 2026",
    author: "Academic Team",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=85",
    intro: "Better preparation is usually built through small habits repeated consistently. Here are simple ways to make your study sessions more focused.",
    sections: [
      ["Plan Realistic Targets", "Break a large syllabus into daily targets that you can genuinely complete. A realistic plan is more useful than an overloaded timetable."],
      ["Use Active Recall", "Close your notes and try to explain the concept in your own words. Questions, flash cards and short self-tests help strengthen recall."],
      ["Revise in Cycles", "Do not wait until the last week. Schedule short revision sessions after learning new topics so important ideas stay fresh."],
      ["Practice With Time Limits", "Mock tests and timed practice improve speed and help you identify the areas that need more attention."],
      ["Protect Your Energy", "Sleep, hydration, movement and short breaks are part of effective preparation. Consistency is easier when your routine is sustainable."]
    ]
  }
};

export default function BlogDetails() {
  const { slug } = useParams();
  const post = article[slug] || article["how-to-choose-right-career-course"];

  return (
    <article className="blog-details">
      <section className="details-hero">
        <div className="section-shell">
          <Link className="back-link" to="/blog"><FiArrowLeft /> Back to Blog</Link>
          <span className="eyebrow">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="details-meta">
            <span><FiCalendar /> {post.date}</span>
            <span><FiUser /> {post.author}</span>
          </div>
        </div>
      </section>

      <section className="details-content">
        <div className="section-shell details-layout">
          <main>
            <img className="details-cover" src={post.image} alt={post.title} />
            <p className="details-intro">{post.intro}</p>
            {post.sections.map(([heading, text]) => (
              <section key={heading}>
                <h2>{heading}</h2>
                <p>{text}</p>
              </section>
            ))}
            <div className="details-bottom">
              <Link to="/courses">Explore Our Courses →</Link>
              <Link to="/contact">Ask for Guidance →</Link>
            </div>
          </main>
          <aside>
            <div className="details-sidebar-card">
              <span className="eyebrow">GYAN INSTITUTE</span>
              <h3>Learn. Grow. Succeed.</h3>
              <p>Get course guidance, admission support and practical learning designed around student goals.</p>
              <Link to="/contact">Contact Us →</Link>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}
