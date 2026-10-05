/* Authored mathematical notation, kept separate from the numerical models. */
const lessonMath={
 composition:tex`\begin{aligned}w_i&=\frac{y_iM_i}{\sum_j y_jM_j}\\[6pt]c&=\frac{P}{RT}\\[6pt]\rho&=c\bar{M}\\p_i&=y_iP\end{aligned}`,
 flux:tex`\begin{aligned}N_A&=J_A+y_A(N_A+N_B)\\[6pt]J_A&=-cD_{AB}\frac{\mathrm{d}y_A}{\mathrm{d}z}\end{aligned}`,
 diffusivity:tex`\begin{gathered}\frac{D_2}{D_1}\approx\left(\frac{T_2}{T_1}\right)^{3/2}\frac{P_1}{P_2}\\[12pt]D_{AB}=\frac{\left(3.03-\frac{0.98}{\sqrt{M_{AB}}}\right)10^{-3}T^{3/2}}{P\sqrt{M_{AB}}\,\sigma_{AB}^{2}\Omega_D}\end{gathered}`,
 balance:tex`\begin{gathered}\frac{\partial c_A}{\partial t}+\nabla\!\cdot\!\mathbf{N}_A=r_A\\[10pt]\text{Steady, no reaction, planar 1-D:}\\[4pt]\frac{\mathrm{d}N_A}{\mathrm{d}z}=0\end{gathered}`,
 pores:tex`\begin{aligned}D_{\mathrm{eff}}&=\frac{\epsilon}{\tau}D_{AB}\\[8pt]\mathrm{Kn}&=\frac{\lambda}{d_{\mathrm{pore}}}\end{aligned}`,
 coefficients:tex`\begin{aligned}N_A&=k_c\,\Delta c_A\\&=k_y\,\Delta y_A\\&=k_G\,\Delta p_A\\[8pt]k_y&=c\,k_c=P\,k_G\end{aligned}`,
 correlation:tex`\begin{aligned}\mathrm{Re}&=\frac{\rho u d}{\mu}\\[8pt]\mathrm{Sc}&=\frac{\mu}{\rho D_{AB}}\\[8pt]\mathrm{Sh}&=\frac{k_c d}{D_{AB}}=\frac{Fd}{cD_{AB}}\end{aligned}`,
 tube:tex`\begin{gathered}\dot{n}_A=\dot{n}_B\frac{y}{1-y}\\[10pt]\frac{\dot{n}_B}{(1-y)^2}\,\mathrm{d}y\\[2pt]=\pi d\,F(y)\ln\!\left(\frac{1-y}{1-y^*}\right)\mathrm{d}z\end{gathered}`,
 equilibrium:tex`\begin{aligned}p_A&=x_A P_A^{\mathrm{sat}}\\[6pt]y_A&=\frac{p_A}{P}\\[6pt]p_A&=H x_A\\[6pt]m&=\frac{H}{P}\end{aligned}`,
 resistance:tex`\begin{aligned}N_A&=k_y(y_G-y_i)\\&=k_x(x_i-x_L)\\[10pt]\frac{1}{K_y}&=\frac{1}{k_y}+\frac{m}{k_x}\end{aligned}`,
 operating:tex`\begin{gathered}X=\frac{x}{1-x}\qquad Y=\frac{y}{1-y}\\[10pt]L_s(X_{\mathrm{out}}-X_{\mathrm{in}})\\=V_s(Y_{\mathrm{in}}-Y_{\mathrm{out}})\end{gathered}`,
 stages:tex`\begin{gathered}A=\frac{L_s}{mV_s}\\[8pt]\frac{Y_{\mathrm{out}}}{Y_{\mathrm{in}}}=\frac{A-1}{A^{N+1}-1}\\[4pt]X_0=0,\quad A\ne1\\[10pt]A=1:\quad\frac{Y_{\mathrm{out}}}{Y_{\mathrm{in}}}=\frac{1}{N+1}\end{gathered}`,
 sphere:tex`\begin{aligned}d_f&=d_0\left(\frac12\right)^{1/3}\\&=0.79370\,d_0\\[12pt]-\frac{\mathrm{d}}{\mathrm{d}t}\!\left(\frac{\rho_L\pi d^3}{6}\right)&=M_A N_A\pi d^2\end{aligned}`
};
for(const l of COURSE.lessons)l.formula=math(lessonMath[l.id],true);
const lesson=id=>COURSE.lessons.find(l=>l.id===id);
lesson('composition').answer=tex`No. \(p=0.03(1\ \mathrm{atm})=0.03\ \mathrm{atm}\).`;
lesson('correlation').check=tex`For \(\mathrm{Sh}=50\), \(D_{AB}=2\times10^{-5}\ \mathrm{m^2\,s^{-1}}\), and \(d=0.05\ \mathrm{m}\), find \(k_c\).`;
lesson('equilibrium').check=tex`At equilibrium, must \(y_A=x_A\)?`;
lesson('equilibrium').answer=tex`No. Under linear Henry equilibrium, \(y_A=mx_A\). Equality requires \(m=1\) or both compositions zero.`;
lesson('sphere').idea=tex`Volume scales as \(d^3\); surface area as \(d^2\). Shrinking can also change terminal velocity, Reynolds number and coefficient.`;
function steps(id,values){values.forEach((v,i)=>{if(v!==null)lesson(id).steps[i][1]=v;});}
steps('composition',[
 tex`For 20 mol% \(\mathrm{CO_2}\) and 80 mol% \(\mathrm{N_2}\), choose a 1 kmol basis: 0.20 kmol of carbon dioxide and 0.80 kmol of nitrogen.`,
 tex`\[\begin{aligned}m_{\mathrm{CO_2}}&=(0.20)(44)=8.80\ \mathrm{kg}\\m_{\mathrm{N_2}}&=(0.80)(28)=22.40\ \mathrm{kg}\\m_{\mathrm{total}}&=31.20\ \mathrm{kg}\end{aligned}\]`,
 tex`\[w_{\mathrm{CO_2}}=\frac{8.80}{31.20}=0.28205\]So 20 mol% becomes 28.205 mass%.`,
 tex`At 101.325 kPa and 300 K:\[\begin{aligned}c&=\frac{101.325}{8.314462618(300)}\\&=0.040622\ \mathrm{kmol\,m^{-3}}\\[6pt]\rho&=c(31.20)\\&=1.2674\ \mathrm{kg\,m^{-3}}\end{aligned}\]`
]);
steps('flux',[null,tex`Equimolar counterdiffusion: \(N_B=-N_A\). Stagnant B: \(N_B=0\). These are different physical constraints.`,tex`Equimolar counterdiffusion:\[N_A=\frac{cD_{AB}}{\delta}(y_{A1}-y_{A2})\]Stagnant B:\[N_A=\frac{cD_{AB}}{\delta}\ln\!\left(\frac{1-y_{A2}}{1-y_{A1}}\right)\]`,tex`For \(y_{A1}>y_{A2}\), both answers are positive. At equal end compositions, both are zero.`]);
steps('diffusivity',[null,tex`Neglecting the collision-integral change:\[\begin{aligned}(PD)_2&=0.845\left(\frac{313}{298}\right)^{3/2}\\&\approx0.90960\ \mathrm{m^2\,Pa\,s^{-1}}\end{aligned}\]`,tex`At 101000 Pa:\[\begin{aligned}D_{AB}&=\frac{0.90960}{101000}\\&=9.0059\times10^{-6}\ \mathrm{m^2\,s^{-1}}\end{aligned}\]`,tex`Use temperature in K, pressure in bar, numerical molecular weights in g/mol, and collision diameter in Å. The formula returns cm²/s.\[\begin{aligned}M_{AB}&=\frac{2M_A M_B}{M_A+M_B}\\[6pt]\sigma_{AB}&=\frac{\sigma_A+\sigma_B}{2}\end{aligned}\]Multiply the result by \(10^{-4}\) to convert cm²/s to m²/s.`]);
steps('balance',[null,null,tex`For a film:\[y_A(0)=y_{A1},\qquad y_A(\delta)=y_{A2}\]An impermeable boundary instead sets zero normal flux.`,tex`In spherical steady radial transport, \(r^2N_A\) is constant, rather than \(N_A\) itself. The same rate passes through shells with different areas.`]);
steps('pores',[null,tex`\(\mathrm{Kn}<0.05\): molecular diffusion. \(\mathrm{Kn}>5\): Knudsen diffusion. Intermediate values need a combined model.`,tex`\[\begin{aligned}D_{\mathrm{eff}}&=\frac{0.40}{2.0}(2\times10^{-5})\\&=4.0000\times10^{-6}\ \mathrm{m^2\,s^{-1}}\end{aligned}\]`,null]);
steps('coefficients',[tex`\(k_c\) multiplies molar concentration and has units of m/s. \(k_y\) multiplies mole fraction and has flux units. \(k_G\) multiplies partial pressure, so its units include inverse pressure.`,tex`For stagnant B:\[N_A=F\ln\!\left(\frac{1-y_2}{1-y_1}\right)\]Using the log-mean inert fraction:\[k_y=\frac{F}{y_{B,M}}\]`,tex`\[\begin{aligned}k_y&=(40)(0.01)\\&=0.40\ \mathrm{mol\,m^{-2}\,s^{-1}}\\[6pt]N_A&=(0.40)(0.05)\\&=0.020000\ \mathrm{mol\,m^{-2}\,s^{-1}}\end{aligned}\]`,tex`When A is dilute at both boundaries, \(y_{B,M}\approx1\) and \(F\approx k_y\). High concentrations need the logarithmic form.`]);
steps('correlation',[null,null,tex`Use \(\rho=1.2\ \mathrm{kg\,m^{-3}}\), \(u=10\ \mathrm{m\,s^{-1}}\), \(d=0.05\ \mathrm{m}\), \(\mu=1.8\times10^{-5}\ \mathrm{Pa\,s}\), and \(D_{AB}=2\times10^{-5}\ \mathrm{m^2\,s^{-1}}\).\[\begin{aligned}\mathrm{Re}&=\frac{(1.2)(10)(0.05)}{1.8\times10^{-5}}\\&=33333.3\\[6pt]\mathrm{Sc}&=\frac{1.8\times10^{-5}}{(1.2)(2\times10^{-5})}\\&=0.75\end{aligned}\]`,tex`Use the selected Sherwood correlation, then:\[k_c=\frac{\mathrm{Sh}\,D_{AB}}{d},\qquad F=\frac{\mathrm{Sh}\,cD_{AB}}{d}\]The workbench calculates the results and checks the range.`]);
steps('tube',[tex`\(\dot{n}_B\) stays constant if air does not transfer or react.\[\dot{n}_{\mathrm{total}}=\frac{\dot{n}_B}{1-y}\]`,tex`\[A_{\mathrm{wall}}=\pi d\,\mathrm{d}z\qquad A_{\mathrm{flow}}=\frac{\pi d^2}{4}\]These two areas serve different purposes.`,tex`A entering below + A entering through the wall = A leaving above.\[\mathrm{d}\dot{n}_A=N_A\pi d\,\mathrm{d}z\]`,tex`\[\begin{aligned}\dot{n}_A&=\dot{n}_B\frac{y}{1-y}\\[8pt]\frac{\mathrm{d}\dot{n}_A}{\mathrm{d}y}&=\frac{\dot{n}_B}{(1-y)^2}\end{aligned}\]`,tex`At 50% of photographed saturation:\[y_{\mathrm{out}}=0.5(0.351)=0.1755\]At full saturation the driving force is zero and the required length diverges.`]);
steps('equilibrium',[null,tex`\[\begin{aligned}P&=x_A P_A^{\mathrm{sat}}+(1-x_A)P_B^{\mathrm{sat}}\\&=(0.40)(14)+(0.60)(4)\\&=8.00\ \mathrm{kPa}\end{aligned}\]`,tex`\[y_A=\frac{5.60}{8.00}=0.70000\]The vapour is richer in the more volatile component.`,tex`For dry air at 1 atm, \(p_{\mathrm{O_2}}\approx0.21\ \mathrm{atm}\). With \(H=4.5\times10^4\ \mathrm{atm}\):\[x_{\mathrm{O_2}}=\frac{0.21}{4.5\times10^4}=4.6667\times10^{-6}\]For water at 1 kg/L and molecular weight 18, the dilute estimate is 8.2963 mg of oxygen per litre.`]);
steps('resistance',[tex`For linear equilibrium \(y^*=mx\), compare the gas-basis resistances:\[R_G=\frac{1}{k_y},\qquad R_L=\frac{m}{k_x}\]`,tex`\[\begin{aligned}\frac{1}{K_y}&=\frac{1}{0.020}+\frac{2}{0.040}\\&=50+50=100\\[6pt]K_y&=0.010000\ \mathrm{mol\,m^{-2}\,s^{-1}}\end{aligned}\]`,tex`\[\begin{aligned}N_A&=K_y(y_G-mx_L)\\&=0.010000(0.10-2\times0.01)\\&=8.0000\times10^{-4}\ \mathrm{mol\,m^{-2}\,s^{-1}}\end{aligned}\]`,tex`\[\begin{aligned}y_i&=y_G-\frac{N_A}{k_y}=0.060000\\[8pt]x_i&=x_L+\frac{N_A}{k_x}=0.030000\end{aligned}\]Check that \(y_i=mx_i\).`]);
steps('operating',[tex`\[\begin{aligned}Y_{\mathrm{in}}&=\frac{0.10}{1-0.10}=0.111111\\[8pt]Y_{\mathrm{out}}&=\frac{0.02}{1-0.02}=0.0204082\end{aligned}\]`,tex`\[\begin{aligned}V_s&=V_{\mathrm{in}}(1-y_{\mathrm{in}})\\&=10(0.90)=9.00\ \mathrm{kmol\,s^{-1}}\end{aligned}\]`,tex`\[\begin{aligned}\dot{n}_{A,\mathrm{removed}}&=V_s(Y_{\mathrm{in}}-Y_{\mathrm{out}})\\&=0.81633\ \mathrm{kmol\,s^{-1}}\\[8pt]V_{\mathrm{out}}&=\frac{V_s}{1-y_{\mathrm{out}}}\\&=9.1837\ \mathrm{kmol\,s^{-1}}\end{aligned}\]`,tex`For \(L_s=20\ \mathrm{kmol\,s^{-1}}\) and \(X_{\mathrm{in}}=0\):\[\begin{aligned}X_{\mathrm{out}}&=\frac{0.81633}{20}=0.0408163\\[8pt]x_{\mathrm{out}}&=\frac{X_{\mathrm{out}}}{1+X_{\mathrm{out}}}\\&=0.039216\end{aligned}\]`]);
steps('stages',[tex`Stage 1 is at the solvent-inlet/gas-outlet end. The exiting streams \(Y_n\) and \(X_n\) are in equilibrium.`,tex`Start at \((X_0,Y_1)\). Move horizontally to equilibrium to find \(X_1\); move vertically to the operating line to find \(Y_2\). Repeat toward the gas feed.`,null,tex`For linear \(Y^*=mX\), pure solvent, and \(A=2\):\[\begin{array}{c|c}N&Y_{\mathrm{out}}/Y_{\mathrm{in}}\\\hline1&\frac13\\[4pt]2&\frac17\\[4pt]3&\frac1{15}\end{array}\]A 90% ratio reduction needs 3 whole ideal stages.`]);
steps('sphere',[tex`For an initial diameter of 1.00 mm:\[d_f=(1.00)\left(\frac12\right)^{1/3}=0.79370\ \mathrm{mm}\]`,null,null,tex`If liquid density and flux are constant:\[\frac{\mathrm{d}d}{\mathrm{d}t}=-\frac{2M_A N_A}{\rho_L}\]Here italic \(d\) is the diameter; upright \(\mathrm{d}\) indicates differentiation. Otherwise retain \(N_A(d)\) inside the integral. Falling distance:\[Z=\int_0^{t_f}v_t(t)\,\mathrm{d}t\]`]);
lesson('correlation').trap=tex`The photos use \(\mathrm{Sh}=0.023\,\mathrm{Re}^{0.8}\mathrm{Sc}^{0.3}\). Textbook 2-74 uses exponents 0.83 and 0.44; 2-75 uses 0.83 and \(1/3\). Keep each correlation intact.`;
lesson('operating').trap=tex`An operating line describes conservation. The exact transformation of \(y^*=mx\) is \[Y^*=\frac{mX}{1+(1-m)X}.\]It is generally not \(Y^*=mX\) outside dilute conditions.`;
lesson('sphere').answer=tex`One eighth: \(\left(\frac12\right)^3=\frac18\).`;
lesson('tube').answer=tex`Because \(y\) means A divided by total gas. A divided by carrier is \(\frac{y}{1-y}\), so \(\dot{n}_A=\dot{n}_B\frac{y}{1-y}\).`;
lesson('correlation').answer=tex`\[k_c=\frac{\mathrm{Sh}\,D_{AB}}{d}=0.020000\ \mathrm{m\,s^{-1}}\]Multiply by total molar concentration to obtain the corresponding molar coefficient.`;
const unitMath={
 composition:tex`\frac{\mathrm{kPa}}{\frac{\mathrm{kPa\,m^3}}{\mathrm{kmol\,K}}\,\mathrm{K}}=\frac{\mathrm{kmol}}{\mathrm{m^3}}`,
 flux:tex`\frac{\mathrm{kmol}}{\mathrm{m^3}}\frac{\mathrm{m^2}}{\mathrm{s}}\frac1{\mathrm{m}}=\frac{\mathrm{kmol}}{\mathrm{m^2\,s}}`,
 diffusivity:tex`\frac{\mathrm{m^2\,Pa\,s^{-1}}}{\mathrm{Pa}}=\mathrm{m^2\,s^{-1}}\qquad 1\ \mathrm{cm^2}=10^{-4}\ \mathrm{m^2}`,
 balance:tex`\left[\frac{\partial c_A}{\partial t}\right]=[r_A]=\mathrm{mol\,m^{-3}\,s^{-1}}`,
 pores:tex`[\epsilon]=[\tau]=1\qquad[D_{\mathrm{eff}}]=\mathrm{m^2\,s^{-1}}`,
 coefficients:tex`\frac{\mathrm{m}}{\mathrm{s}}\frac{\mathrm{mol}}{\mathrm{m^3}}=\frac{\mathrm{mol}}{\mathrm{m^2\,s}}`,
 correlation:tex`\frac{\left(\frac{\mathrm{kg}}{\mathrm{m^3}}\right)\left(\frac{\mathrm{m}}{\mathrm{s}}\right)\mathrm{m}}{\frac{\mathrm{kg}}{\mathrm{m\,s}}}=1`,
 tube:tex`\underbrace{\frac{\mathrm{kmol}}{\mathrm{m^2\,s}}}_{F}\underbrace{\mathrm{m^2}}_{\pi d\,\mathrm{d}z}\underbrace{1}_{\ln(\text{ratio})}=\frac{\mathrm{kmol}}{\mathrm{s}}`,
 equilibrium:tex`p_A=Hx_A\quad\Longrightarrow\quad[H]=\text{pressure}`,
 resistance:tex`[k_y]=[k_x]=[K_y]=\mathrm{mol\,m^{-2}\,s^{-1}}`,
 operating:tex`\frac{\mathrm{kmol\ carrier}}{\mathrm{s}}\frac{\mathrm{kmol\ solute}}{\mathrm{kmol\ carrier}}=\frac{\mathrm{kmol\ solute}}{\mathrm{s}}`,
 stages:tex`[A]=[N]=1`,
 sphere:tex`\frac{\mathrm{kg}}{\mathrm{mol}}\frac{\mathrm{mol}}{\mathrm{m^2\,s}}\mathrm{m^2}=\frac{\mathrm{kg}}{\mathrm{s}}`
};
for(const l of COURSE.lessons)l.units=math(unitMath[l.id],true);
const caseMath=[
 tex`\begin{aligned}y^*&=\frac{P_{\mathrm{methanol}}^{\mathrm{sat}}}{P}\\[6pt]&=\frac{35.43\ \mathrm{kPa}}{101\ \mathrm{kPa}}\approx0.351\\[10pt]y_{\mathrm{target}}&=0.5(0.351)=0.1755\end{aligned}`,
 tex`\begin{aligned}\dot{n}_B&=(1-y)\dot{n}_{\mathrm{total}}\\[8pt]\dot{n}_A&=\dot{n}_B\frac{y}{1-y}\\[8pt]u&=\frac{u_0}{1-y}\end{aligned}`,
 tex`\begin{aligned}\bar{M}&=29(1-y)+32y\\&=29+3y\\[8pt]c&=\frac{P}{RT}\\[8pt]\rho&=c\bar{M}\end{aligned}`,
 tex`\begin{aligned}\mathrm{Re}&=\frac{\rho u d}{\mu}\\[8pt]\mathrm{Sc}&=\frac{\mu}{\rho D_{AB}}\\[8pt]\mathrm{Sh}&=0.023\,\mathrm{Re}^{0.8}\mathrm{Sc}^{0.3}\\[8pt]F&=\frac{\mathrm{Sh}\,cD_{AB}}{d}\end{aligned}`,
 tex`\begin{aligned}N_A&=F\ln\!\left(\frac{1-y}{1-y^*}\right)\\[10pt]\Delta\dot{n}_A&=N_A\underbrace{\pi d\,\Delta z}_{\text{wet wall area}}\end{aligned}`,
 tex`\begin{aligned}\dot{n}_{A,\mathrm{next}}&=\dot{n}_{A,\mathrm{current}}+\Delta\dot{n}_A\\[10pt]y_{\mathrm{next}}&=\frac{\dot{n}_{A,\mathrm{next}}}{\dot{n}_B+\dot{n}_{A,\mathrm{next}}}\end{aligned}`,
 tex`\begin{gathered}\mathrm{d}\dot{n}_A=\frac{\dot{n}_B}{(1-y)^2}\,\mathrm{d}y\\[12pt]\frac{\dot{n}_B}{(1-y)^2}\,\mathrm{d}y\\[2pt]=\pi dF(y)\ln\!\left(\frac{1-y}{1-y^*}\right)\mathrm{d}z\end{gathered}`,
 tex`\begin{gathered}Z=\int_0^{y_{\mathrm{target}}}\frac{\dot{n}_B\,\mathrm{d}y}{(1-y)^2\,\pi d\,F(y)\ln\!\left(\frac{1-y}{1-y^*}\right)}\\[12pt]y_{\mathrm{target}}=0.1755\end{gathered}`
];
caseSteps.forEach((s,i)=>s[3]=math(caseMath[i],true));
const mockMath=[
 [null,tex`\[c=\frac{101325}{8.314462618(300)}=40.62199\ \mathrm{mol\,m^{-3}}\]`,tex`\[\begin{aligned}N_A&=\frac{(40.62199)(2\times10^{-5})}{0.002}(0.20-0.02)\\&=0.0731196\ \mathrm{mol\,m^{-2}\,s^{-1}}\end{aligned}\]`,tex`\[\begin{aligned}N_A&=\frac{(40.62199)(2\times10^{-5})}{0.002}\ln\!\left(\frac{0.98}{0.80}\right)\\&=0.0824386\ \mathrm{mol\,m^{-2}\,s^{-1}}\end{aligned}\]`],
 [tex`\[\begin{aligned}\mathrm{Re}&=\frac{\rho ud}{\mu}=33333.333\\[6pt]\mathrm{Sc}&=\frac{\mu}{\rho D_{AB}}=0.75000\end{aligned}\]The stated Reynolds condition is met.`,tex`\[\begin{aligned}\mathrm{Sh}&=0.023(33333.333)^{0.8}(0.75)^{0.3}\\&=87.60910\end{aligned}\]`,tex`\[\begin{aligned}k_c&=\frac{87.60910(2\times10^{-5})}{0.05}\\&=0.0350436\ \mathrm{m\,s^{-1}}\\[8pt]F&=(40)(0.0350436)\\&=1.40175\ \mathrm{mol\,m^{-2}\,s^{-1}}\end{aligned}\]`,tex`For evaporation through stagnant B, use \(F\) with\[\ln\!\left(\frac{1-y_{\mathrm{bulk}}}{1-y_{\mathrm{interface}}}\right).\]Do not substitute the textbook exponents midway.`],
 [tex`\[\dot{n}_{\mathrm{total}}=\frac{\dot{n}_B}{1-y},\qquad\dot{n}_A=\dot{n}_B\frac{y}{1-y}\]`,tex`\[\mathrm{d}\dot{n}_A=\frac{\dot{n}_B}{(1-y)^2}\,\mathrm{d}y\]`,tex`\[\mathrm{d}\dot{n}_A=\pi dF(y)\ln\!\left(\frac{1-y}{1-y^*}\right)\mathrm{d}z\]`,tex`\[Z=\int_0^{0.5y^*}\frac{\dot{n}_B\,\mathrm{d}y}{(1-y)^2\pi dF(y)\ln\!\left(\frac{1-y}{1-y^*}\right)}\]`,tex`As \(y\to y^*\), the logarithm tends to zero and the required length diverges.`],
 [tex`\[\begin{aligned}\frac1{K_y}&=\frac1{0.020}+\frac2{0.040}\\&=100\ \mathrm{m^2\,s\,mol^{-1}}\\[6pt]K_y&=0.010000\ \mathrm{mol\,m^{-2}\,s^{-1}}\end{aligned}\]`,tex`\[\begin{aligned}N_A&=0.010000(0.10-2\times0.01)\\&=8.0000\times10^{-4}\ \mathrm{mol\,m^{-2}\,s^{-1}}\end{aligned}\]`,tex`\[\begin{aligned}y_i&=0.10-\frac{0.0008}{0.020}=0.060000\\[8pt]x_i&=0.01+\frac{0.0008}{0.040}=0.030000\end{aligned}\]`,tex`\(y_i=2x_i\); both film fluxes equal 0.0008.\[\text{Gas resistance fraction}=\frac{1/k_y}{1/K_y}=0.50\]`],
 [tex`\[\begin{aligned}V_s&=10(0.90)=9.00\ \mathrm{kmol\,s^{-1}}\\[6pt]Y_{\mathrm{in}}&=\frac{0.10}{0.90}=0.111111\\[6pt]Y_{\mathrm{out}}&=\frac{0.02}{0.98}=0.0204082\end{aligned}\]`,tex`\[\begin{aligned}\dot{n}_{A,\mathrm{removed}}&=9(Y_{\mathrm{in}}-Y_{\mathrm{out}})\\&=0.81633\ \mathrm{kmol\,s^{-1}}\\[8pt]X_{\mathrm{out}}&=\frac{0.81633}{20}=0.0408163\\[8pt]x_{\mathrm{out}}&=\frac{X_{\mathrm{out}}}{1+X_{\mathrm{out}}}=0.039216\end{aligned}\]`,tex`At \(A=2\):\[\frac{Y_{\mathrm{out}}}{Y_{\mathrm{in}}}=\frac1{2^{N+1}-1}\]\(N=2\) leaves \(\frac17=14.286\%\). \(N=3\) leaves \(\frac1{15}=6.667\%\).`,null]
];
mockMath.forEach((ss,i)=>ss.forEach((s,j)=>{if(s!==null)mockProblems[i].steps[j][1]=s;}));
mockProblems[0].prompt=tex`At 300 K and 101325 Pa, A crosses a 2 mm gas film. \(D_{AB}=2\times10^{-5}\ \mathrm{m^2\,s^{-1}}\), \(y_{A1}=0.20\), and \(y_{A2}=0.02\). Find \(c\) and \(N_A\) for equimolar counterdiffusion and for stagnant B. Use \(R=8.314462618\ \mathrm{Pa\,m^3\,mol^{-1}\,K^{-1}}\).`;
mockProblems[1].prompt=tex`Gas flows at 10 m/s inside a 0.05 m tube. Use \(\rho=1.2\ \mathrm{kg\,m^{-3}}\), \(\mu=1.8\times10^{-5}\ \mathrm{Pa\,s}\), \(D_{AB}=2\times10^{-5}\ \mathrm{m^2\,s^{-1}}\), and \(c=40\ \mathrm{mol\,m^{-3}}\). The classroom correlation is\[\mathrm{Sh}=0.023\,\mathrm{Re}^{0.8}\mathrm{Sc}^{0.3},\quad\mathrm{Re}>5000.\]Calculate Reynolds, Schmidt and Sherwood numbers, then \(k_c\) and \(F\).`;
mockProblems[2].prompt=tex`A dry carrier enters a wetted tube. Only A evaporates. Carrier flow \(\dot{n}_B\) and diameter \(d\) are constant; \(F=F(y)\), and the wall-equilibrium fraction is \(y^*\). Derive the length \(Z\) needed to reach \(y_{\mathrm{out}}=0.5y^*\). Explain why total gas flow changes.`;
mockProblems[3].prompt=tex`For linear equilibrium \(y^*=2x\), the coefficients are \(k_y=0.020\) and \(k_x=0.040\ \mathrm{mol\,m^{-2}\,s^{-1}}\). Bulk fractions: \(y_G=0.10\) and \(x_L=0.01\). Calculate \(K_y\), \(N_A\), \(y_i\), \(x_i\), and the gas resistance fraction.`;
mockProblems[4].prompt=tex`An absorber receives 10 kmol/s gas at \(y_{\mathrm{in}}=0.10\) and must leave at \(y_{\mathrm{out}}=0.02\). Pure solvent flow: \(L_s=20\ \mathrm{kmol\,s^{-1}}\). Find \(V_s\), the A removal rate, and \(x_{\mathrm{out}}\). Separately, a dilute ideal cascade has \(A=2\) and pure solvent; find whole stages for at least 90% solute removal.`;

// Mathematical meaning beside the exact spreadsheet implementation.
const excelGeneral=[
 [tex`z_0=0,\qquad z_{j+1}=z_j+\Delta z`,tex`\(z_j\): position at row \(j\), m. \(\Delta z\): fixed slice height, m. Initialise at zero; subsequent rows add one slice.`],
 [tex`\dot{n}_{A,0}=0,\qquad\dot{n}_{A,j+1}=\dot{n}_{A,j}+\Delta\dot{n}_{A,j}`,tex`\(\dot{n}_{A,j}\): methanol rate entering the slice, kmol/s. \(\Delta\dot{n}_{A,j}\): rate added through that slice’s wall, kmol/s. The inlet is dry.`],
 [tex`y_j=\frac{\dot{n}_{A,j}}{\dot{n}_B+\dot{n}_{A,j}}`,tex`\(y_j\): methanol mole fraction, dimensionless (kmol methanol/kmol total gas). \(\dot{n}_B\): constant dry-air rate, kmol/s.`],
 [tex`\bar{M}_j=M_B(1-y_j)+M_Ay_j`,tex`\(\bar{M}_j\): mixture molecular weight, kg/kmol. \(M_B=29\): air; \(M_A=32\): methanol, both kg/kmol.`],
 [tex`\rho_j=c\bar{M}_j`,tex`\(\rho_j\): gas density, kg/m³. \(c\): total molar concentration, kmol/m³. Multiply by mixture molecular weight in kg/kmol.`],
 [tex`u_j=\frac{u_0}{1-y_j}`,tex`\(u_j\): local gas speed, m/s. \(u_0\): dry-gas inlet speed, m/s. This relation assumes constant pressure, temperature and flow area.`],
 [tex`\mathrm{Re}_j=\frac{\rho_j u_j d}{\mu}`,tex`\(\mathrm{Re}_j\): Reynolds number, dimensionless. \(d\): tube diameter, m. \(\mu\): viscosity, Pa·s = kg/(m·s). The classroom model requires a value above 5000.`],
 [tex`\mathrm{Sc}_j=\frac{\mu}{\rho_j D_{AB}}`,tex`\(\mathrm{Sc}_j\): Schmidt number, dimensionless. \(D_{AB}\): methanol–air diffusivity, m²/s. Density is in kg/m³ and viscosity in kg/(m·s).`],
 [tex`\mathrm{Sh}_j=0.023\,\mathrm{Re}_j^{0.8}\mathrm{Sc}_j^{0.3}`,tex`\(\mathrm{Sh}_j\): Sherwood number, dimensionless. This is the photographed classroom correlation; its exponents belong together.`],
 [tex`F_j=\frac{\mathrm{Sh}_j\,cD_{AB}}{d}`,tex`\(F_j\): local molar transfer coefficient, kmol/(m²·s). Use \(c\) in kmol/m³, \(D_{AB}\) in m²/s, and \(d\) in m.`],
 [tex`\mathcal{L}_j=\ln\!\left(\frac{1-y_j}{1-y^*}\right)`,tex`\(\mathcal{L}_j\): logarithmic driving force, dimensionless. \(y^*\): wall-equilibrium mole fraction, dimensionless. This calligraphic L is a label for the log term, not the solvent flow.`],
 [tex`N_{A,j}=F_j\mathcal{L}_j`,tex`\(N_{A,j}\): local methanol flux, kmol/(m²·s). A flux is a rate per transfer area; it is different from \(\dot{n}_A\).`],
 [tex`\Delta A_{\mathrm{wall}}=\pi d\,\Delta z`,tex`\(\Delta A_{\mathrm{wall}}\): wet wall area of one slice, m². \(d\) and \(\Delta z\) are both in m. This is not the circular flow area.`],
 [tex`\Delta\dot{n}_{A,j}=N_{A,j}\,\Delta A_{\mathrm{wall}}`,tex`\(\Delta\dot{n}_{A,j}\): methanol rate added by this slice, kmol/s. Flux in kmol/(m²·s) multiplied by wall area in m² gives a molar rate.`],
 [tex`\mathrm{Re}_j>5000,\qquad0\le y_j<y^*`,tex`Validity checks are dimensionless. Stop at the first row reaching \(y_j\ge y_{\mathrm{target}}\). The Excel formula returns a status label, not a physical quantity.`],
 [tex`r_{B,j}=(\dot{n}_B+\dot{n}_{A,j})(1-y_j)-\dot{n}_B`,tex`\(r_{B,j}\): carrier balance residual, kmol/s; it should be approximately zero. This checks internal bookkeeping, not the validity of the correlation.`]
];
const excelConstantMath=[
 [tex`c=\frac{P}{RT}`,tex`\(c\): kmol/m³; \(P\): kPa; \(T\): K; \(R=8.314462618\ \mathrm{kPa\,m^3\,kmol^{-1}\,K^{-1}}\).`],
 [tex`D_{AB}=\frac{(PD)_{\mathrm{ref}}}{1000P}\left(\frac{T}{T_{\mathrm{ref}}}\right)^{3/2}`,tex`\(D_{AB}\): m²/s; reference \(PD\): m²·Pa/s; \(P\): kPa. The factor 1000 converts kPa to Pa. Both temperatures are in K.`],
 [tex`A_{\mathrm{flow}}=\frac{\pi d^2}{4}`,tex`Circular flow area: m². Tube internal diameter \(d\): m.`],
 [tex`\dot{n}_B=cA_{\mathrm{flow}}u_0`,tex`Dry-air rate: kmol/s. Concentration: kmol/m³; area: m²; inlet speed: m/s. Inlet methanol fraction is zero.`],
 [tex`y_{\mathrm{target}}=f_{\mathrm{target}}\,y^*`,tex`All three quantities are dimensionless. \(f_{\mathrm{target}}=0.5\) means half the saturation mole fraction; it does not mean a methanol fraction of 0.5.`]
];
function excelPhysicalTable(rows,relations,constant=false){return `<table class="excel-relations"><thead><tr><th>${constant?'Cell':'Column'}</th><th>General equation · definitions & units</th><th>${constant?'Excel formula':'Excel · first data row 25'}</th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td>${r[0]}</td><td><strong>${r[1]}</strong>${math(relations[i][0],true)}<div class="quantity-definitions">${relations[i][1]}</div></td><td><code>${esc(r[2])}</code>${!constant&&i<2?`<p class="small">Next row: <code>${i===0?'=A25+$B$12':'=B25+N25'}</code></p>`:''}</td></tr>`).join('')}</tbody></table>`;}
COURSE.questions[1][2]=[tex`\(N_A+N_B=0\)`,tex`\(N_B=0\)`,tex`\(J_A=0\)`];
COURSE.questions[5][2]=[tex`\(k_c\)`,tex`\(k_y\)`,tex`Pressure-based \(k_G\)`];
COURSE.questions[5][4]=tex`\(N_A=k_c\,\Delta c_A\). A speed multiplied by a molar concentration gives a molar flux.`;
COURSE.questions[7][2]=[tex`\(\frac{\pi d^2}{4}\)`,tex`\(\pi d\,\mathrm{d}z\)`,tex`\(\frac{d\,\mathrm{d}z}{4}\)`];
COURSE.questions[7][4]=tex`The lateral wall area transfers solute; \(\frac{\pi d^2}{4}\) is the gas-flow area.`;
COURSE.questions[9][1]=tex`For \(p_A=Hx_A\), the slope in \(y^*=mx\) equals…`;
COURSE.questions[9][2]=[tex`\(HP\)`,tex`\(\frac{H}{P}\)`,tex`\(\frac{P}{H}\)`];
COURSE.questions[9][4]=tex`\[y=\frac{p_A}{P}=\frac{H}{P}x_A\]Therefore \(m=H/P\).`;
COURSE.questions[10][1]=tex`If \(\frac{m}{k_x}\) contributes 90% of resistance, improve…`;
COURSE.questions[11][2]=[tex`Always bulk \(y_G\)`,tex`Always \(mx_L\)`,tex`In equilibrium with interface \(x_i\)`];
COURSE.questions[12][4]=tex`\[Y=\frac{y}{1-y}=\frac{0.20}{0.80}=0.25\]`;
COURSE.questions[16][4]=tex`\[D_{\mathrm{eff}}=\frac{\epsilon}{\tau}D_{AB}\]Doubling the denominator halves the result.`;

/* Normalize remaining short references in prose without touching Excel syntax,
   original source documents, or any already-authored TeX. */
const proseEquations=[
 ['Sh=Fd/(cD)',tex`\mathrm{Sh}=\frac{Fd}{cD_{AB}}`],
 ['Re=ρud/μ',tex`\mathrm{Re}=\frac{\rho ud}{\mu}`],['Sc=μ/(ρD)',tex`\mathrm{Sc}=\frac{\mu}{\rho D_{AB}}`],
 ['c=P/(RT)',tex`c=\frac{P}{RT}`],['u=u0/(1−y)',tex`u=\frac{u_0}{1-y}`],
 ['M=29(1−y)+32y=29+3y',tex`\bar{M}=29(1-y)+32y=29+3y`],
 ['dṅA/dy',tex`\frac{\mathrm{d}\dot{n}_A}{\mathrm{d}y}`],
 ['ṅA=ṅB y/(1−y)',tex`\dot{n}_A=\dot{n}_B\frac{y}{1-y}`],
 ['ṅB/(1−y)²',tex`\frac{\dot{n}_B}{(1-y)^2}`],
 ['ΔṅA/ṅB',tex`\frac{\Delta\dot{n}_A}{\dot{n}_B}`],
 ['u=0.1/(1−y)',tex`u=\frac{0.1}{1-y}`],
 ['c(πd²/4)u₀',tex`c\frac{\pi d^2}{4}u_0`],
 ['ρ=0.0439(29+3y)',tex`\rho=0.0439(29+3y)`],
 ['P/(RT)=0.0388121',tex`\frac{P}{RT}=0.0388121`],
 ['Sh≈5.71√(29+3y)/(1−y)^0.8',tex`\mathrm{Sh}\approx\frac{5.71\sqrt{29+3y}}{(1-y)^{0.8}}`],
 ['F=Sh cD/d',tex`F=\frac{\mathrm{Sh}\,cD_{AB}}{d}`],
 ['ln[(1−y)/(1−y*)]',tex`\ln\!\left(\frac{1-y}{1-y^*}\right)`],
 ['(1−y)/(1−y*)',tex`\frac{1-y}{1-y^*}`],
 ['y/(1−y)',tex`\frac{y}{1-y}`],
 ['1/(1−y)²',tex`\frac1{(1-y)^2}`],
 ['Ls/(mVs)',tex`\frac{L_s}{mV_s}`],
 ['+Ls/Vs',tex`+\frac{L_s}{V_s}`],['−Ls/Vs',tex`-\frac{L_s}{V_s}`],
 ['m/kx',tex`\frac{m}{k_x}`],['1/ky',tex`\frac1{k_y}`],['1/kx',tex`\frac1{k_x}`],
 ['πd²/4',tex`\frac{\pi d^2}{4}`],['πdΔz',tex`\pi d\,\Delta z`],['πd dz',tex`\pi d\,\mathrm{d}z`],
 ['∂/∂t = 0',tex`\frac{\partial}{\partial t}=0`],
 ['T^1.5',tex`T^{3/2}`],['D ∝ √T',tex`D_{AB}\propto\sqrt{T}`],['√2',tex`\sqrt2`],['√T',tex`\sqrt T`],
 ['DAB=DBA',tex`D_{AB}=D_{BA}`],['P=nRT/V',tex`P=\frac{nRT}{V}`],
 ['y*=mxL',tex`y^*=mx_L`],['yi=mxi',tex`y_i=mx_i`],['yi = mxi',tex`y_i=mx_i`],['y*=mx',tex`y^*=mx`],['Y*=mX',tex`Y^*=mX`],
 ['NA = −NB',tex`N_A=-N_B`],['NB = 0',tex`N_B=0`],['JB = 0',tex`J_B=0`],
 ['ṅA=ṅB y',tex`\dot{n}_A=\dot{n}_B y`],
 ['π(0.1)(2.256×10⁻⁴)=7.08743×10⁻⁵',tex`\pi(0.1)(2.256\times10^{-4})=7.08743\times10^{-5}`]
];
const proseTokens={NA:'N_A',NB:'N_B',JA:'J_A',JB:'J_B',DAB:'D_{AB}',DBA:'D_{BA}',Deff:'D_{\\mathrm{eff}}',kc:'k_c',ky:'k_y',kx:'k_x',kG:'k_G',Ky:'K_y',yA:'y_A',xA:'x_A',yG:'y_G',xL:'x_L',yi:'y_i',xi:'x_i',mxL:'mx_L',mxi:'mx_i',Ls:'L_s',Vs:'V_s',yout:'y_{\\mathrm{out}}',yin:'y_{\\mathrm{in}}',ytarget:'y_{\\mathrm{target}}',d0:'d_0',df:'d_f',nA:'\\dot{n}_A',Re:'\\mathrm{Re}',Sc:'\\mathrm{Sc}',Sh:'\\mathrm{Sh}'};
function polishMathText(value){
 return value.split(/(\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\])/g).map((chunk,i)=>{
  if(i%2)return chunk;const held=[];const hold=t=>{held.push('\\('+t+'\\)');return `QQMATH${held.length-1}QQ`;};
  for(const [plain,t] of proseEquations)chunk=chunk.split(plain).join(hold(t));
  chunk=chunk.replace(/\b(NA|NB|JA|JB|DAB|DBA|Deff|kc|ky|kx|kG|Ky|yA|xA|yG|xL|yi|xi|mxL|mxi|Ls|Vs|yout|yin|ytarget|d0|df|nA|Re|Sc|Sh)\b/g,t=>hold(proseTokens[t]));
  chunk=chunk.replace(/ṅ([AB])/g,(_,s)=>hold('\\dot{n}_'+s)).replace(/\by\*/g,()=>hold('y^*'));
  chunk=chunk.replace(/(\d+(?:\.\d+)?)\s*[×x]\s*10([⁻⁺⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g,(_,a,b)=>hold(a+'\\times10^{'+Array.from(b).map(c=>({'⁻':'-','⁺':'+','⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9'}[c])).join('')+'}'));
  chunk=chunk.replace(/\b(\d+(?:\.\d+)?)e([+-]\d+)\b/g,(_,a,b)=>hold(a+'\\times10^{'+Number(b)+'}'));
  if(typeof unitifyPlain==='function')chunk=unitifyPlain(chunk,hold);
  return chunk.replace(/QQMATH(\d+)QQ/g,(_,j)=>held[+j]);
 }).join('');
}
