const masteryNumbers=[
 [
 [String.raw`c=\frac{101.3}{8.314(298)}=0.0408868\ \mathrm{kmol\,m^{-3}}`,String.raw`\dot{n}_A=(0.0200)(0.0408868)(0.100)=8.17736\times10^{-5}\ \mathrm{kmol\,s^{-1}}`,String.raw`\dot{m}_A=(18)(8.17736\times10^{-5})=0.00147192\ \mathrm{kg\,s^{-1}}`],
 [String.raw`\dot{n}_A=\frac{0.0014719}{18}=0.0000817722\ \mathrm{kmol\,s^{-1}}`,String.raw`\dot{n}=\frac{(101.3)(0.100)}{(8.314)(298)}=0.00408868\ \mathrm{kmol\,s^{-1}}`,String.raw`y_A=\frac{0.0000817722}{0.00408868}=0.0199997\approx0.02000`],
 [String.raw`y_AM_Ac=(0.0200)(18)(0.0408868)=0.0147192\ \mathrm{kg\,m^{-3}}`,String.raw`Q=\frac{0.00200}{0.0147192}=0.135876\ \mathrm{m^3\,s^{-1}}`],
 [String.raw`y_AM_A=(0.0200)(18)=0.360,\quad(1-y_A)M_B=(0.9800)(29)=28.42`,String.raw`w_A=\frac{0.360}{0.360+28.42}=0.0125087`,String.raw`y_A=\frac{0.0125087/18}{0.0125087/18+0.9874913/29}\approx0.02000`]
 ],[
 [String.raw`\delta=2.00\ \mathrm{mm}=0.00200\ \mathrm{m},\quad \frac{cD}{\delta}=\frac{(40.9)(2.50\times10^{-5})}{0.00200}=0.51125`,String.raw`\ln\!\left(\frac{1-0.010}{1-0.030}\right)=\ln(0.99/0.97)=0.0204089`,String.raw`N_A=(0.51125)(0.0204089)=0.0104340\ \mathrm{mol\,m^{-2}\,s^{-1}}`],
 [String.raw`cD=(40.9)(2.50\times10^{-5})=0.0010225\ \mathrm{mol\,m^{-1}\,s^{-1}}`,String.raw`\delta=\frac{(0.0010225)(0.0204089)}{0.00800}=0.0026085\ \mathrm{m}`],
 [String.raw`a=\frac{N_A\delta}{cD}=\frac{(0.00500)(0.00200)}{0.0010225}=0.00977995`,String.raw`1-y_2=(1-0.030)e^{0.00977995}=0.9795331`,String.raw`y_2=1-0.9795331=0.0204669`],
 [String.raw`N_AM_A=(0.0104340)(0.018)=0.000187812\ \mathrm{kg\,m^{-2}\,s^{-1}}`,String.raw`A=\frac{0.000100}{0.000187812}=0.53245\ \mathrm{m^2}`]
 ],[
 [String.raw`\mathrm{Re}=\frac{(1.18)(2.0)(0.50)}{1.85\times10^{-5}}=63783.8`,String.raw`\mathrm{Sc}=\frac{1.85\times10^{-5}}{(1.18)(2.50\times10^{-5})}=0.627119`,String.raw`\mathrm{Sh}=0.664(63783.8)^{1/2}(0.627119)^{1/3}=143.540`,String.raw`k_c=\frac{(143.540)(2.50\times10^{-5})}{0.50}=0.00717700\ \mathrm{m\,s^{-1}}`,String.raw`\dot{n}_A=(0.00717700)(0.50)(0.20)(0.50)=0.000358850\ \mathrm{mol\,s^{-1}}`],
 [String.raw`k_cA=(0.00717700)(0.50)(0.20)=0.000717700\ \mathrm{m^3\,s^{-1}}`,String.raw`\Delta c_A=\frac{0.000200}{0.000717700}=0.278668\ \mathrm{mol\,m^{-3}}`],
 [String.raw`2=\sqrt{u_{\rm new}/2.0}\Rightarrow4=u_{\rm new}/2.0\Rightarrow u_{\rm new}=8.0\ \mathrm{m\,s^{-1}}`,String.raw`\mathrm{Re}_{\rm new}=63783.8(8.0/2.0)=255135<300000`],
 [String.raw`k_cL\Delta c_A=(0.00717700)(0.50)(0.50)=0.00179425\ \mathrm{mol\,m^{-1}\,s^{-1}}`,String.raw`W=\frac{0.000500}{0.00179425}=0.278668\ \mathrm{m}`]
 ],[
 [String.raw`R_g=1/0.020=50,\quad R_l=1.50/0.030=50,\quad K_y=1/(50+50)=0.010`,String.raw`y-mx=0.010-(1.50)(0.002)=0.007`,String.raw`N_A=(0.010)(0.007)=0.0000700\ \mathrm{mol\,m^{-2}\,s^{-1}}`,String.raw`y_i=0.010-0.0000700/0.020=0.0065,\quad x_i=0.002+0.0000700/0.030=0.0043333`],
 [String.raw`1/K_y-1/k_y=1/0.012-1/0.020=83.3333-50=33.3333`,String.raw`k_x=1.50/33.3333=0.0450\ \mathrm{mol\,m^{-2}\,s^{-1}}`],
 [String.raw`N_A/K_y=0.0000400/0.010=0.00400`,String.raw`x=(0.010-0.00400)/1.50=0.00400`],
 [String.raw`k_{x,\rm new}=2(0.030)=0.060,\quad K_{y,\rm new}=\frac{1}{1/0.020+1.50/0.060}=0.0133333`,String.raw`N_{A,\rm new}=(0.0133333)(0.007)=0.0000933333`,String.raw`\frac{N_{A,\rm new}-N_{A,\rm old}}{N_{A,\rm old}}=\frac{0.0000933333-0.0000700}{0.0000700}=0.33333`]
 ],[
 [String.raw`Y_{\rm out}=\frac{(1.0)(0.010)+(3.0)(0)}{1.0+3.0/1.50}=0.010/3=0.0033333`,String.raw`X_{\rm out}=0.0033333/1.50=0.0022222`,String.raw`\dot{n}_{\rm removed}=(1.0)(0.010-0.0033333)=0.0066667\ \mathrm{mol\,s^{-1}}`,String.raw`\eta=0.0066667/0.010=0.66667=66.667\%`],
 [String.raw`L_s=(1.50)(1.0)\left(\frac{0.010}{0.002}-1\right)=1.50(5-1)=6.0\ \mathrm{mol\,s^{-1}}`],
 [String.raw`Y_{\rm out}=\frac{(1.0)(0.010)+(3.0)(0.001)}{1.0+3.0/1.50}=0.013/3=0.0043333`,String.raw`\eta=\frac{0.010-0.0043333}{0.010}=0.56667=56.667\%`],
 [String.raw`G_s(Y_{\rm in}-Y_{\rm out})=L_sY_{\rm out}/m`,String.raw`m=\frac{(3.0)(0.004)}{(1.0)(0.010-0.004)}=\frac{0.012}{0.006}=2.0`]
 ]];
function addMasteryNumbers(html){const b=document.createElement('div');b.innerHTML=html;b.querySelectorAll('.visual-family').forEach((s,i)=>s.querySelectorAll(':scope > .mastery-variant').forEach((v,j)=>{const solution=v.querySelector('.mastery-solution'),foundation=solution.querySelector('.mastery-foundation'),panel=document.createElement('div');panel.className='numerical-trace';panel.innerHTML=`<h4>Insert this problem’s numbers</h4><p class="small">Follow each intermediate value into the next line. Units are shown in the value list and dimensional derivation; input values are rounded as specified.</p>${masteryNumbers[i][j].map((eq,k)=>calculusStep('Numerical step '+(k+1),eq,k===0?'Use this variant’s given values, rather than carrying over an input that the variant changes. Identify each factor in the value list above.':'The previous line supplies an intermediate quantity. Substitute it, complete the indicated arithmetic, and retain the basis and units of the general equation.')).join('')}`;foundation.after(panel);if(i===0&&j===1){const symbolic=foundation.querySelectorAll('.calculus-step')[2];symbolic.insertAdjacentHTML('beforeend',`<p class="small">Read this stacked fraction as “water moles per second divided by all gas moles per second.” Numerically:</p>${math(tex`y_A=\frac{0.0014719/18}{(101.3)(0.100)/[(8.314)(298)]}`,true)}${math(tex`=\frac{0.0000817722\ \mathrm{kmol\,s^{-1}}}{0.00408868\ \mathrm{kmol\,s^{-1}}}\approx0.02000`,true)}`);}}));return b.innerHTML;}
const masteryWithGraphs=masteryPage;masteryPage=()=>addMasteryNumbers(masteryWithGraphs());
