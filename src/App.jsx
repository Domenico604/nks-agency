import React from "react";
              <Tooltip contentStyle={{backgroundColor:"black",border:"none"}}/>
              <Line type="monotone" dataKey="До" stroke="#777" />
              <Line type="monotone" dataKey="После" stroke="#38bdf8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section>
        <h3>Отзывы</h3>
        <div className="grid">
          {testimonials.map((t,i)=>(
            <div className="card" key={i}>
              <img src={t.img} className="avatar"/>
              <h4>{t.name}</h4>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <h3>О нас</h3>
        <p className="about-text">
          Мы создаём контент-системы, которые превращают просмотры в актив.
          Наша цель — масштабировать бренды через вирусную механику.
        </p>
      </section>

      {/* CTA */}
      <section id="contact" className="cta">
        <h3>Есть ли вам что сказать?</h3>
        <button className="button">Готовы выслушать вашу идею</button>
      </section>

      <footer>
        © {new Date().getFullYear()} NKS Vector
      </footer>
    </div>
  );
}
